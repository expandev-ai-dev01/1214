# Gerenciador de Hábitos

Sistema para registrar hábitos e marcar como concluídos.

## Tecnologias

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.1.9
- TailwindCSS 3.4.14
- React Router DOM 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- React Hook Form 7.63.0
- Zod 4.1.11

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Tipos globais
│   ├── utils/            # Funções utilitárias
│   └── constants/        # Constantes globais
├── domain/               # Domínios de negócio (a serem criados)
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Configure as variáveis de ambiente conforme necessário
3. Execute `npm install` para instalar as dependências
4. Execute `npm run dev` para iniciar o servidor de desenvolvimento

## Funcionalidades Planejadas

- Cadastro de hábitos
- Marcação de conclusão
- Visualização de hábitos
- Estatísticas de progresso
- Lembretes
- Categorização de hábitos
- Configurações de conta

## API Backend

O frontend se conecta ao backend através de dois contextos:

- **Público** (`/api/v1/external`): Endpoints sem autenticação
- **Autenticado** (`/api/v1/internal`): Endpoints que requerem token

## Padrões de Código

- Componentes em PascalCase
- Hooks começam com `use`
- Arquivos de tipos em `types.ts`
- Estilos em `variants.ts` usando Tailwind
- Exports centralizados em `index.ts`