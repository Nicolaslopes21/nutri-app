import React from 'react';
import { Image as RNImage, Platform } from 'react-native';

/**
 * Componente adaptativo que funciona tanto em web quanto em mobile
 * Usa Image nativo no mobile e img HTML no web
 */
export default function ImagemAdaptativa({ source, style, resizeMode, ...props }) {
  if (Platform.OS === 'web') {
    // Para web, converte require para URL string
    let imageUrl = source;
    if (typeof source === 'number') {
      // Se for require(), tenta extrair a URL
      imageUrl = source;
    } else if (source?.uri) {
      imageUrl = source.uri;
    }

    return (
      <img
        src={imageUrl}
        style={{
          objectFit: resizeMode || 'contain',
          ...style,
        }}
        alt="imagem"
        {...props}
      />
    );
  }

  // Para mobile, usa Image nativo
  return (
    <RNImage
      source={source}
      style={style}
      resizeMode={resizeMode}
      {...props}
    />
  );
}
