import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image, Picker } from 'react-native';
import { db, storage } from './firebaseconfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-web';

export default function App() {
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState('');
  const [flag, setFlag] = useState('não lido');
  const [imageUri, setImageUri] = useState(null);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingLivroId, setEditingLivroId] = useState(null);

  const flags = ['já li', 'não lido', 'lendo'];

  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) return null;

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `livros/${filename}`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const adicionarOuAtualizarLivro = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      if (editingLivroId) {
        const livroRef = doc(db, 'livros', editingLivroId);
        await updateDoc(livroRef, {
          nome,
          autor,
          editora,
          ano,
          imageUrl: imageUrl || null,
          flag
        });
        alert('Livro atualizado com sucesso!');
        setEditingLivroId(null);
      } else {
        await addDoc(collection(db, 'livros'), {
          nome,
          autor,
          editora,
          ano,
          imageUrl: imageUrl || null,
          flag
        });
        alert('Livro adicionado com sucesso!');
      }

      setNome('');
      setAutor('');
      setEditora('');
      setAno('');
      setFlag('não lido');
      setImageUri(null);
      fetchLivros();
    } catch (e) {
      console.error("Erro ao salvar livro: ", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchLivros = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'livros'));
      const livrosList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setLivros(livrosList);
    } catch (e) {
      console.error("Erro ao buscar livros: ", e);
    }
  };

  const editarLivro = (livro) => {
    setNome(livro.nome);
    setAutor(livro.autor);
    setEditora(livro.editora);
    setAno(livro.ano);
    setFlag(livro.flag);
    setImageUri(livro.imageUrl);
    setEditingLivroId(livro.id);
  };

  const excluirLivro = async (livroId) => {
    try {
      await deleteDoc(doc(db, 'livros', livroId));
      alert('Livro excluído com sucesso!');
      fetchLivros();
    } catch (e) {
      console.error("Erro ao excluir livro: ", e);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Minha Biblioteca</Text>
      
      <Text style={styles.label}>Nome do Livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        value={nome}
        onChangeText={setNome}
      />
      
      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o autor do livro"
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={styles.label}>Editora</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a editora do livro"
        value={editora}
        onChangeText={setEditora}
      />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ano de publicação"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={flag}
        style={styles.picker}
        onValueChange={(itemValue) => setFlag(itemValue)}
      >
        {flags.map((flagOption, index) => (
          <Picker.Item key={index} label={flagOption} value={flagOption} />
        ))}
      </Picker>

      <Button 
        title="Selecionar Imagem" 
        onPress={selecionarImagem} 
        color="#fa6b6b"
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button 
        title={loading ? "Salvando..." : editingLivroId ? "Atualizar Livro" : "Adicionar Livro"} 
        onPress={adicionarOuAtualizarLivro} 
        color="#ff0000"
      />

      <Text style={styles.sectionTitle}>Lista de Livros</Text>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.livroItem}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.livroImage} />
            ) : (
              <Icon name="book" size={50} color="#4682b4" style={styles.livroIcon} />
            )}
            <View style={styles.livroDetails}>
              <Text style={styles.livroNome}>{item.nome}</Text>
              <Text style={styles.livroAutor}>Autor: {item.autor}</Text>
              <Text style={styles.livroEditora}>Editora: {item.editora}</Text>
              <Text style={styles.livroAno}>Ano: {item.ano}</Text>
              <Text style={styles.livroFlag}>Status: {item.flag}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => editarLivro(item)} style={styles.actionButton}>
                <Icon name="edit" size={25} color="#4682b4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirLivro(item.id)} style={styles.actionButton}>
                <Icon name="trash" size={25} color="#ff6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={styles.livroList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fa6b6b',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#fa6b6b',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fa6b6b',
    marginTop: 20,
    marginBottom: 10,
  },
  livroList: {
    marginTop: 10,
  },
  livroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  livroIcon: {
    marginRight: 15,
  },
  livroImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  livroDetails: {
    flex: 1,
  },
  livroNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  livroAutor: {
    fontSize: 16,
    color: '#555',
  },
  livroEditora: {
    fontSize: 16,
    color: '#555',
  },
  livroAno: {
    fontSize: 16,
    color: '#555',
  },
  livroFlag: {
    fontSize: 16,
    color: '#555',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
});
