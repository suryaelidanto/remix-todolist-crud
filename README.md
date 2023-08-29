# Welcome to Remix Todolist 📃

Remix Todolist is boilerplate for a simple todolist that is ready to go, easy to use, and easy to understand!

## Development 💻

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Copy `.env` from `.env.example` :

```sh
cp .env.example .env
```

Then, configure your `.env` with your postgresql credentials :

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```


Push schema to your database (migrating schema to your database) : 

```sh
npx migrate db push
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Deployment 🔥

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).
