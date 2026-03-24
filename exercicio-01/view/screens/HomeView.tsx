import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'; 
import { useItemViewModel } from '../../viewmodels/ItemViewModel';
import { Item } from '../../models/Item';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeView: React.FC = () => {

    const navigation = useNavigation<HomeNavigationProp>();

    const { items } = useItemViewModel();


    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.cartao}>
            <Text style={styles.texto}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Adicionar')} 
                style={styles.botaoAdicionar}
            >
                <Text style={styles.textoBotao}>
                    Adicionar Item
                </Text>
            </TouchableOpacity>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: "#e32424" 
    },
    botaoAdicionar: { 
        backgroundColor: 'black', 
        padding: 12, 
        borderRadius: 40, 
        marginBottom: 16 
    },
    textoBotao: { 
        color: 'white', 
        textAlign: 'center', 
        fontWeight: 'bold' 
    },
    cartao: { 
        padding: 16, 
        backgroundColor: '#1a1818', 
        marginTop: 5, 
        borderRadius: 20 
    },
    texto: { 
        fontSize: 16, 
        color: '#383838' 
    }
});