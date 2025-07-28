# PEC Hacks 3.0 - Official Website

This is the official website for PEC Hacks 3.0, built with React + Vite and deployed on GitHub Pages with a custom domain.

## 🚀 Live Site

Visit: [https://pechacks.org](https://pechacks.org)

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.8
- **3D Graphics**: Three.js
- **Animations**: Framer Motion, Anime.js
- **Icons**: Lucide React, React Icons, Ant Design Icons
- **Deployment**: GitHub Pages with custom domain

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/thecoding-society/pechacks.git
cd pechacks
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally (http://localhost:4173)
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual)

## ⚙️ Configuration

### Development Ports
- **Dev Server**: `localhost:3000` (configurable in vite.config.js)
- **Preview Server**: `localhost:4173` (for testing production build)

### Environment Variables
Create a `.env` file for local development:
```env
VITE_APP_TITLE=PEC Hacks 3.0
VITE_APP_URL=https://pechacks.org
VITE_APP_DESCRIPTION=Tamil Nadu's premier hackathon at PEC Chennai
```

### Network Access
The development server is configured with `host: true` to allow network access:
- Local: `http://localhost:3000`
- Network: `http://[your-ip]:3000` (accessible from other devices on same network)

## 🚀 Deployment

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when changes are pushed to the `pre-reg` branch using GitHub Actions.

### Manual Deployment

#### Option 1: Using npm script
```bash
npm run deploy
```

#### Option 2: Using deployment scripts
**Windows:**
```cmd
deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🌐 Custom Domain Setup

The site uses the custom domain `pechacks.org`. The domain configuration is handled by:

1. `CNAME` file in the root directory
2. GitHub Actions workflow that preserves the CNAME during deployment
3. DNS settings pointing to GitHub Pages

### DNS Configuration Required:
For your domain registrar, set up these DNS records:

**For root domain (pechacks.org):**
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A  
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @  
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

**For www subdomain (optional):**
```
Type: CNAME
Name: www
Value: thecoding-society.github.io
```

### GitHub Pages Settings:
- Repository Settings → Pages
- Source: **"GitHub Actions"** (not "Deploy from a branch")
- Custom domain: `pechacks.org`
- Enforce HTTPS: ✅ Enabled

**Important**: You must enable GitHub Actions as the source, not deploy from a branch!

## 📁 Project Structure

```
pechacks/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── assets/         # Images, icons, etc.
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── .github/
│   └── workflows/      # GitHub Actions
├── dist/               # Built files (generated)
├── deploy.sh           # Linux/Mac deployment script
├── deploy.bat          # Windows deployment script
├── CNAME               # Custom domain configuration
└── package.json        # Project configuration
```

## 🔄 Workflow

1. **Development**: Work on the `pre-reg` branch (main development branch)
2. **Testing**: Test locally using `npm run dev`
3. **Deployment**: Push to `pre-reg` branch triggers automatic deployment

## 🐛 Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Clear cache: `npm run build -- --force`

### Deployment Issues
- **GitHub Pages Source**: Must be set to "GitHub Actions" (not "Deploy from a branch")
- **Permissions**: Ensure repository has Actions enabled in Settings → Actions → General
- **Branch Protection**: If `pre-reg` branch has protection rules, allow GitHub Actions to bypass them
- **Custom Domain**: Verify CNAME file exists in `public/` directory
- **Workflow Permissions**: Repository Settings → Actions → General → Workflow permissions should be "Read and write permissions"

### Permission Errors (403)
If you see "Write access to repository not granted":
1. Go to Repository Settings → Actions → General
2. Set "Workflow permissions" to "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Ensure Pages source is set to "GitHub Actions"

### Custom Domain Issues
- Verify DNS records point to GitHub Pages
- Check domain configuration in repository settings
- Wait for DNS propagation (up to 24 hours)
- CNAME file should be in `public/` directory (gets copied to build)

## 📄 License

This project is private and proprietary to The Coding Society, PEC Chennai.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📞 Support

For issues related to the website, contact The Coding Society at PEC Chennai.

---

Built with ❤️ by The Coding Society, PEC Chennai
