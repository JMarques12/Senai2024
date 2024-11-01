import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { db, storage } from './firebaseconfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [data, setData] = useState(new Date());
  const [imageUri, setImageUri] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEntradaId, setEditingEntradaId] = useState(null);

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
    const storageRef = ref(storage, `viagens/${filename}`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const adicionarOuAtualizarEntrada = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      if (editingEntradaId) {
        const entradaRef = doc(db, 'entradas', editingEntradaId);
        await updateDoc(entradaRef, {
          titulo,
          descricao,
          data,
          localizacao,
          imageUrl: imageUrl || null,
        });
        alert('Entrada atualizada com sucesso!');
        setEditingEntradaId(null);
      } else {
        await addDoc(collection(db, 'entradas'), {
          titulo,
          descricao,
          data,
          localizacao,
          imageUrl: imageUrl || null,
        });
        alert('Entrada adicionada com sucesso!');
      }

      resetForm();
      fetchEntradas();
    } catch (e) {
      console.error("Erro ao salvar entrada: ", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntradas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'entradas'));
      const entradasList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setEntradas(entradasList);
    } catch (e) {
      console.error("Erro ao buscar entradas: ", e);
    }
  };

  const editarEntrada = (entrada) => {
    setTitulo(entrada.titulo);
    setDescricao(entrada.descricao);
    setLocalizacao(entrada.localizacao);
    setImageUri(entrada.imageUrl);
    setEditingEntradaId(entrada.id);
  };

  const excluirEntrada = async (entradaId) => {
    try {
      await deleteDoc(doc(db, 'entradas', entradaId));
      alert('Entrada excluída com sucesso!');
      fetchEntradas();
    } catch (e) {
      console.error("Erro ao excluir entrada: ", e);
    }
  };

  const resetForm = () => {
    setTitulo('');
    setDescricao('');
    setLocalizacao('');
    setImageUri(null);
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Diário de Viagem</Text>
      
      <Text style={styles.label}>Título da Entrada</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título da entrada"
        value={titulo}
        onChangeText={setTitulo}
      />
      
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição da entrada"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Localização</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <Button 
        title="Selecionar Imagem" 
        onPress={selecionarImagem} 
        color="#fa6b6b"
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button 
        title={loading ? "Salvando..." : editingEntradaId ? "Atualizar Entrada" : "Adicionar Entrada"} 
        onPress={adicionarOuAtualizarEntrada} 
        color="#ff0000"
      />

      <Text style={styles.sectionTitle}>Entradas de Viagem</Text>
      <FlatList
        data={entradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entradaItem}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.entradaImage} />
            ) : (
              <Icon name="image" size={50} color="#4682b4" style={styles.entradaIcon} />
            )}
            <View style={styles.entradaDetails}>
              <Text style={styles.entradaTitulo}>{item.titulo}</Text>
              <Text style={styles.entradaDescricao}>{item.descricao}</Text>
              <Text style={styles.entradaLocalizacao}>Localização: {item.localizacao}</Text>
              <Text style={styles.entradaData}>Data: {item.data.toDate().toLocaleDateString()}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => editarEntrada(item)} style={styles.actionButton}>
                <Icon name="edit" size={25} color="#4682b4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirEntrada(item.id)} style={styles.actionButton}>
                <Icon name="trash" size={25} color="#ff6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={styles.entradaList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  entradaList: {
    marginTop: 10,
  },
  entradaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  entradaIcon: {
    marginRight: 15,
  },
  entradaImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  entradaDetails: {
    flex: 1,
  },
  entradaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  entradaDescricao: {
    fontSize: 16,
    color: '#555',
  },
  entradaLocalizacao: {
    fontSize: 16,
    color: '#555',
  },
  entradaData: {
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
