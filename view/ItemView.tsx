import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Item } from '../models/Item';
import { useItemViewModel } from '../viewmodels/ItemViewModel';

export const ItemView: React.FC = () => {
  const { viewModel, items, dialogVisible, inputText } = useItemViewModel();

  const handleAddItem = () => {
    try {
      viewModel.addItem();
    }catch (error: any) {
      Alert.alert("Erro", error.message);
    } 
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        onPress={() => viewModel.openDialog()}
        style={{
          backgroundColor: '#007bff',
          padding: 12,
          borderRadius: 4,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={dialogVisible} transparent animationType="slide">
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 8,
          }}>
            <Text style={{ fontSize: 18, marginBottom: 16 }}>Adicionar Item</Text>
            
            <TextInput
              value={inputText}
              onChangeText={(text) => viewModel.setInputText(text)}
              placeholder="Nome do item"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 8,
                marginBottom: 16,
                borderRadius: 4,
              }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => viewModel.closeDialog()}
                style={{ padding: 12, backgroundColor: '#ccc', borderRadius: 4, flex: 0.45 }}
              >
                <Text style={{ textAlign: 'center' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddItem}
                style={{ padding: 12, backgroundColor: '#007bff', borderRadius: 4, flex: 0.45 }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};