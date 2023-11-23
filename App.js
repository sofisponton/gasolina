import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  
} from 'react-native';
import styles from './globalStyles';
import { Picker } from '@react-native-picker/picker';
import fundo from '../gasolina/assets/fundoaba.png'

export default function App() {
  const [litros, setLitros] = useState('');
  const [resultado, setResultado] = useState(false);
  const [totalPagar, setTotalPagar] = useState(0);
  const [combustivelEscolhido, setCombustivelEscolhido] = useState('gasolina');

  const calcularPreco = () => {
    let intLitros = parseFloat(litros);

    if (isNaN(intLitros)) {
      return;
    }

    const precoGasolina = 5.60; 
    const precoEtanol = 3.00; 

    if (combustivelEscolhido === 'gasolina') {
      setResultado(true);
      setTotalPagar(intLitros * precoGasolina);
    } else {
      setResultado(true);
      setTotalPagar(intLitros * precoEtanol);
    }

    Keyboard.dismiss();
  };

  const limparDados = () => {
    setLitros('');
    setResultado(false);
    setTotalPagar(0);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground source={fundo} resizeMode="cover" style={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title}>Abasteça seu carro</Text>
           <Picker
            selectedValue={combustivelEscolhido}
            onValueChange={(itemValue) => setCombustivelEscolhido(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Gasolina" value="gasolina" style={{color:'#A9A9A9'}} />
            <Picker.Item label="Etanol" value="etanol" />
          </Picker>
          <Text></Text>
          <View style={styles.viewInput}>
            <TextInput
              value={litros}
              onChangeText={setLitros}
              keyboardType="number-pad"
              style={styles.input}
              returnKeyLabel="Done"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Litros"
            />
          </View>
                    
          <Text></Text>

          <View>
            <Pressable onPress={calcularPreco} style={styles.botaocalcular}>
              <Text style={styles.textoBotao}>Calcular</Text>
            </Pressable>
            <Pressable onPress={limparDados} style={styles.botaocalcular}>
              <Text style={styles.textoBotao}>Limpar Conteúdo</Text>
            </Pressable>
          </View>

          <View style={styles.botaoResultado}>
            <Text style={styles.textoBotao}>Total a pagar:</Text>
            {resultado && <Text style={styles.textoBotao}>{totalPagar}</Text>}
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}