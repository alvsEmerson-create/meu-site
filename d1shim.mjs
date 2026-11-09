// Simula a API do Cloudflare D1 usando o SQLite embutido do Node (apenas para testes locais).
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
export function makeD1(file = ':memory:', schemaPath = new URL('../schema.sql', import.meta.url)) {
  const db = new DatabaseSync(file);
  db.exec(fs.readFileSync(schemaPath, 'utf8'));
  const mk = (sql, args = []) => ({
    bind: (...a) => mk(sql, a),
    _run() { const st = db.prepare(sql); const isSel = /^\s*(SELECT|WITH)/i.test(sql); if (isSel) { return { results: st.all(...args) }; } const r = st.run(...args); return { results: [], meta: { changes: r.changes } }; },
    async first() { const r = db.prepare(sql).get(...args); return r === undefined ? null : { ...r }; },
    async all() { return { results: db.prepare(sql).all(...args).map((x) => ({ ...x })) }; },
    async run() { return this._run(); },
  });
  return {
    prepare: (sql) => mk(sql),
    async batch(stmts) { db.exec('BEGIN'); try { const out = stmts.map((s) => s._run()); db.exec('COMMIT'); return out; } catch (e) { db.exec('ROLLBACK'); throw e; } },
    _raw: db,
  };
}
