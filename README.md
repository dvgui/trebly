# Trebly

Trebly is a WorldCoin MiniApp that allows users to stake funds in a combined pool and win all the combined earnings in a shared lottery. It extends the PoolTogether concept to support custom tokens like WLD. Trebly aims to offer a fun and engaging way to incentivize saving and community participation.

## Project Links

- **Designs**: [Figma Design](https://www.figma.com/design/Pt5y8DTJzFy8OCLuSM2RyE/Trebly?node-id=407-2&t=0RRAHRqa3arBrPDE-1)
- **Presentation**: [Google Slides Presentation](https://docs.google.com/presentation/d/1FZbSy6m-nlOx0dYTBmzF8U50ObVbBJqzCvQz5uHFUpI/edit?usp=sharing)
- **Live Demo**: [Trebly Web App](https://trebly.vercel.app/)

## Features

- **Combined Pooling**: Users can stake their funds into a shared pool.
- **Lottery System**: All combined earnings are distributed through a lottery system.
- **Support for Custom Tokens**: Extends PoolTogether functionality to support custom tokens like WLD.
- **Seamless Integration with WorldCoin**: Built using the WLD MiniApp SDK.

## Tech Stack

- **Frontend**: Next.js + TypeScript
- **WorldCoin Integration**: WLD MiniApp SDK
- **Hosting**: Vercel

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd trebly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env.local` file and add your environment variables**:
   ```bash
   APP_ID=""
   DEV_PORTAL_API_KEY=""
   WLD_CLIENT_ID=""
   WLD_CLIENT_SECRET=""
   NEXTAUTH_URL=http://localhost:3000
   POOL_ADDRESS="YOUR_POOL_ADDRESS"
   DONATION_ADDRESS="YOUR_DONATION_ADDRESS"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to [http://localhost:3000](http://localhost:3000).

## Usage

- Stake your WLD tokens in the pool.
- Wait for the weekly lottery draw.
- If you're lucky, you'll win all the combined earnings!

## Contribution

We welcome contributions! Feel free to submit a PR or open an issue if you find any bugs or have feature requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
