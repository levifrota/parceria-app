# Configurar Regras do Firebase Firestore

## ❌ Problema

Erro: `Missing or insufficient permissions`

## ✅ Solução

### 1. Acesse o Firebase Console

https://console.firebase.google.com/

### 2. Selecione seu projeto

`parceria-app`

### 3. Vá para Firestore Database

No menu lateral: **Firestore Database**

### 4. Clique na aba "Regras" (Rules)

### 5. Cole as seguintes regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública da coleção contents
    match /contents/{document=**} {
      allow read: if true;
      allow write: if false; // Apenas via console ou backend
    }

    // Permitir gerenciamento de URLs de imagens (ImgBB)
    match /images/{document=**} {
      allow read: if true;
      allow write: if false; // Apenas via console ou backend
    }

    // Adicione outras coleções conforme necessário
  }
}
```

### 6. Clique em "Publicar" (Publish)

## 📝 Explicação das Regras

- `allow read: if true` - Permite que qualquer pessoa leia os conteúdos e imagens
- `allow write: if false` - Impede que usuários escrevam diretamente no banco
- Você só poderá adicionar/editar conteúdos via Firebase Console
- **Imagens**: As imagens são armazenadas no ImgBB (externo), apenas as URLs ficam salvas no Firestore

## 🔒 Regras de Produção (Recomendado depois)

Para produção, implemente autenticação:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contents/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Apenas usuários autenticados
    }

    match /images/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Apenas usuários autenticados
    }
  }
}
```

## ✅ Verificar se funcionou

Após publicar as regras:

1. Reinicie o app no Android
2. Verifique o console se os conteúdos são carregados
3. Você deve ver: `✅ Firebase: Conteúdos organizados por categoria`
