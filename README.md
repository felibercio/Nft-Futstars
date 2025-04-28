# NFT FutStar

Plataforma de NFTs para colecionáveis de futebol, permitindo mint ao vivo, compra/venda, jogos interativo com os NFTs e clubverse com imersão e interação pelo estádio, O torcedor explora o estádio 3D virtual e encontra “drops secretos” escondidos como um Caça ao NFT no ClubVerse (Exploração 3D)

## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Ethers.js
- RainbowKit
- Wagmi

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/nft-futstar.git
cd nft-futstar
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_CHAIN_ID=1
VITE_NETWORK=mainnet
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## Estrutura do Projeto

```
nft-futstar/
├── public/               # Arquivos estáticos
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/           # Páginas principais
│   ├── styles/          # CSS e Tailwind config
│   ├── utils/           # Funções utilitárias
│   ├── context/         # Contextos React
│   └── contracts/       # ABIs e integrações Web3
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm run preview`: Visualiza a build de produção localmente

## Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das suas alterações
3. Faça push para a branch
4. Abra um Pull Request # Nft-Futstars
