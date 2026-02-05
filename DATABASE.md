# Sistema de Persistência - SQLite

## Estrutura do Banco de Dados

O aplicativo usa SQLite (via Capacitor Community SQLite) para persistir dados localmente no dispositivo.

### Tabelas

#### 1. `family_profile`

Armazena as informações da família (perfil único)

| Campo        | Tipo     | Descrição                                   |
| ------------ | -------- | ------------------------------------------- |
| id           | INTEGER  | ID fixo = 1 (apenas um registro)            |
| baby_name    | TEXT     | Nome do bebê                                |
| parent1_name | TEXT     | Nome do pai/mãe 1                           |
| parent2_name | TEXT     | Nome do pai/mãe 2                           |
| user_role    | TEXT     | Tratamento preferido (papai/mamae/parceria) |
| created_at   | DATETIME | Data de criação                             |
| updated_at   | DATETIME | Data da última atualização                  |

#### 2. `contractions`

Armazena o histórico de contrações

| Campo      | Tipo     | Descrição                        |
| ---------- | -------- | -------------------------------- |
| id         | INTEGER  | ID auto-incremento               |
| timestamp  | INTEGER  | Timestamp de início da contração |
| duration   | INTEGER  | Duração em milissegundos         |
| created_at | DATETIME | Data de criação do registro      |

#### 3. `favorites`

Armazena os conteúdos favoritos

| Campo      | Tipo     | Descrição                 |
| ---------- | -------- | ------------------------- |
| id         | INTEGER  | ID auto-incremento        |
| content_id | INTEGER  | ID do conteúdo favoritado |
| created_at | DATETIME | Data que foi favoritado   |

## Arquivos Principais

### `src/services/database.js`

Serviço principal que gerencia o SQLite:

- Inicialização do banco
- Criação de tabelas
- Operações CRUD
- Fallback para localStorage (navegador web)

### `src/boot/database.js`

Boot file do Quasar que inicializa o banco ao iniciar o app

### `src/stores/pregnancy.js`

Store Pinia que usa o serviço de database:

- `loadFromDatabase()` - Carrega dados ao iniciar
- `updateFamilyProfileAndSave()` - Salva perfil
- `addContractionAndSave()` - Adiciona contração
- `endContractionAndSave()` - Finaliza e salva contração
- `clearContractionsAndDatabase()` - Limpa histórico
- `toggleFavoriteAndSave()` - Toggle favorito

## Funcionalidades

### 1. **Persistência Automática**

Todos os dados são automaticamente salvos no banco de dados local

### 2. **Fallback para Web**

Quando rodando no navegador (não em app nativo), usa localStorage

### 3. **Carregamento Inicial**

Ao abrir o app, carrega todos os dados salvos (perfil, contrações, favoritos)

### 4. **Sincronização Reativa**

A store Pinia mantém os dados reativos e sincronizados

## Como Usar

### No Navegador (Desenvolvimento)

```bash
quasar dev
```

- Usa localStorage automaticamente
- Dados persistem entre recarregamentos

### No Dispositivo (Android)

```bash
quasar build -m capacitor -T android
npx cap sync
npx cap open android
```

- Usa SQLite nativo
- Dados persistem mesmo fechando o app

## Instalação de Dependências

```bash
npm install --save @capacitor-community/sqlite
```

## Configuração do Capacitor

O plugin SQLite está configurado em `src-capacitor/capacitor.config.json`

## Testando

1. **Cadastre um perfil** - Feche e reabra o app, o perfil deve estar lá
2. **Adicione favoritos** - Devem persistir entre sessões
3. **Registre contrações** - Histórico é mantido no banco

## Observações

- O banco é criado automaticamente na primeira execução
- Não há necessidade de migrations manuais
- Os dados são privados do dispositivo (não sincronizam na nuvem)
- Para adicionar backup/sync, seria necessário implementar API backend
