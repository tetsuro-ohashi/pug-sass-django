# pug-sass-django


PostgreSQLのユーザー作成
userは任意（mysite/settings.pyのdb設定をあわせる）

```
$ createuser -s -P user
```

PostgreSQLのデータベース作成

```
$ createdb DB
```

PostgreSQLのテーブル確認

```
$ psql -l
```

PostgreSQLのユーザーでデータベースにアクセス

```
$ psql -U user DB
```

テンプレートエンジン用のパッケージをインストール

```
$ npm i
```

テンプレートエンジン起動

```
$ npm run gulp
```
