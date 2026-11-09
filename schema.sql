-- Banco de dados Soldados Socorristas (Cloudflare D1 / SQLite)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  ident TEXT NOT NULL,               -- nome/identificação informado pelo professor
  role TEXT NOT NULL CHECK (role IN ('student','teacher','admin')),
  status TEXT NOT NULL CHECK (status IN ('active','pending','disabled')),
  hash TEXT NOT NULL,                -- PBKDF2-SHA256 (nunca a senha)
  salt TEXT NOT NULL,
  iter INTEGER NOT NULL,
  must_change INTEGER NOT NULL DEFAULT 0,
  created INTEGER NOT NULL,
  last_login INTEGER
);
CREATE TABLE IF NOT EXISTS sessions (
  th TEXT PRIMARY KEY,               -- SHA-256 do token (o token em si só existe no cookie)
  uid TEXT NOT NULL,
  expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_uid ON sessions(uid);
CREATE TABLE IF NOT EXISTS invites (
  id TEXT PRIMARY KEY,
  th TEXT NOT NULL UNIQUE,           -- SHA-256 do código do convite
  hint TEXT NOT NULL,                -- 3 primeiros caracteres, só para identificar na lista
  created_by TEXT NOT NULL,
  created INTEGER NOT NULL,
  expires INTEGER NOT NULL,
  used_by TEXT
);
CREATE TABLE IF NOT EXISTS attempts (
  k TEXT PRIMARY KEY,
  n INTEGER NOT NULL,
  until INTEGER NOT NULL DEFAULT 0,
  t INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v INTEGER NOT NULL);
INSERT OR IGNORE INTO meta (k, v) VALUES ('seq', 0);
CREATE TABLE IF NOT EXISTS docs (
  coll TEXT NOT NULL,
  id TEXT NOT NULL,
  data TEXT NOT NULL,
  seq INTEGER NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (coll, id)
);
CREATE INDEX IF NOT EXISTS docs_seq ON docs(seq);
