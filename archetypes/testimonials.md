---
date: '{{ .Date }}'
draft: true
reviewer:
  name: '{{ replace .File.ContentBaseName "-" " " | title }}'
  role: ''
weight: 0
headless: true
---
