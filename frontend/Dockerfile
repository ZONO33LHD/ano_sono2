# ベースとなるイメージを指定
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# ポート3555を公開
EXPOSE 3555

# アプリケーションを起動
CMD ["npm", "start"]