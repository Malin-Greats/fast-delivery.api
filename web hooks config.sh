[
  {
    "id": "fastdapi",
    "execute-command": "/home/sam/redeploy-fast-delivery.api.sh",
    "command-working-directory": "/home/sam/fast-delivery.api",
    "trigger-rule": {
      "and": [
        {
          "match": {
            "type": "payload-hash-sha1",
            "secret": "........",
            "parameter": {
              "source": "header",
              "name": "X-Hub-Signature"
            }
          }
        },
        {
          "match": {
            "type": "value",
            "value": "refs/heads/main",
            "parameter": {
              "source": "payload",
              "name": "ref"
            }
          }
        }
      ]
    }
  }
]

chmod +x redeploy-fast-delivery.api.sh
#!/bin/sh
cd /home/sam/fast-delivery.api
# 1. Fetch the latest code from remote
git pull -f origin main

# 2. Install dependencies
npm install

# 3. (Optional) Build step that compiles code, bundles assets, etc.
# npm run build

# 4. Restart application
# pm2 restart nodejs-app
pm2 restart src/index.ts