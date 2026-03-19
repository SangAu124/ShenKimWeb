# Deploy Notes

## Option 1: Nginx container
```bash
cd ~/.openclaw/workspace/shenkim-site
docker build -t shenkim-site .
docker run -d --name shenkim-site -p 8080:80 shenkim-site
```

## Option 2: Cloudflare Pages
- Upload this folder as static site
- Build command: none
- Output directory: /

## Option 3: Existing server root
- Copy `index.html` and `styles.css` into web root

## Domain routing idea
- `shenkim.com` -> this static site
- `api.shenkim.com` -> existing API/tunnel endpoint
- `mc.shenkim.com` -> minecraft
- `ssh.shenkim.com` -> ssh
