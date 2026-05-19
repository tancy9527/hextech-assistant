-- Delete ALL English/non-Chinese named runes
-- They will be re-added with Chinese names by import_missing_runes.sql

DELETE FROM runes WHERE name ~ '[a-zA-Z]';