# 基本となるnginxイメージを指定
FROM nginx:latest

# ホストマシンのnginx.confをコンテナの設定ディレクトリにコピー
COPY nginx.conf /etc/nginx/nginx.conf

# その他の必要なファイルがあればここでコピー
# COPY other-config.conf /etc/nginx/conf.d/

# ポート80を公開
EXPOSE 80

# nginxをフォアグラウンドで実行
CMD ["nginx", "-g", "daemon off;"]