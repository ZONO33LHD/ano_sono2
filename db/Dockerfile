# MySQLの公式イメージを使用
FROM mysql:8.0

# 環境変数を設定
ENV MYSQL_ROOT_PASSWORD=ano_sono2
ENV MYSQL_DATABASE=ano_sono2
ENV MYSQL_USER=ano_sono2
ENV MYSQL_PASSWORD=ano_sono2

# 初期化スクリプトをコピー
COPY ./init.sql /docker-entrypoint-initdb.d/