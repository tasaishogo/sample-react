# サービス名
学習履歴記録アプリ

# サービスの説明
Reactの練習に作った「学習項目」と「学習に要した時間」を記録して積み上げを確認できるアプリ
フロントエンドのホスティング基盤にはFirebaseを、バックエンドにはSupabaseをそれぞれ利用している

# 環境設定
.envに以下を記載すること

* VITE_SUPABASE_KEY：SUPABASEのPostgres接続用のAPIキー

# 起動の仕方

ローカル

* npm install
* npm run dev

Firebaseへの反映

* 手動：make deploy でFirebaseに資材が反映される
* 自動：Githubへのmainへのpush時点で.github/workflows/cicd.ymlの内容のフローが自動でキックされる