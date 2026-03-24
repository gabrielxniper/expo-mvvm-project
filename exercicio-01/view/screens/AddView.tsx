import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useItemViewModel } from '../../viewmodels/ItemViewModel';


type AddNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Adicionar'>;

export const AddView: React.FC = () => {
  const navigation = useNavigation<AddNavigationProp>();
  const { viewModel, inputText } = useItemViewModel();

  const handleAddItem = () => {
    try {
      viewModel.addItem();
      Alert.alert("Sucesso", "Produto adicionado com sucesso!")
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Novo Item</Text>

      <TextInput
        value={inputText}
        onChangeText={(text) => viewModel.setInputText(text)}
        placeholder="Digite o nome do item..."
        style={styles.input}
      />

      <View style={styles.linhaBotoes}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.botao, { backgroundColor: '#fa9191' }]}
        >
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAddItem}
          style={[styles.botao, { backgroundColor: 'white' }]}
        >
          <Text style={[styles.textoBotao, { color: 'black' }]}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#242222', 
    justifyContent: 'center' 
  },
  titulo: { 
    fontSize: 20, 
    marginBottom: 16, 
    color: "white",
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: 'black', 
    padding: 12, 
    marginBottom: 24, 
    borderRadius: 10, 
    backgroundColor: '#e32424' },
  linhaBotoes: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  botao: { 
    padding: 14, 
    borderRadius: 40, 
    flex: 0.45 
  },
  textoBotao: { 
    textAlign: 'center', 
    fontWeight: 'bold',
    color: "#e32424"
  }
});