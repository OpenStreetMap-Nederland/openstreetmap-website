This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

pre-requisites:
nodejs >= 18.0.0

**If you want to use oauth you need the app to be runnig on https (optional)**

```bash
npx local-ssl-proxy --source 3000 --target 3001
```

**Next you need to install the dependencies**

```bash
npm install
# or
pnpm install
```

**Then you need to create a .env file**

```bash
cp .env.example .env
```

**Then you can run the development server**

```bash
npm run dev
# or
pnpm dev
```
