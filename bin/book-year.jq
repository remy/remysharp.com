def mapper:
  if type == "object" and .items then
	{ (.name): .items[-1] | mapper }
  elif type == "array" then
	reduce .[] as $el ({}; . + { ($el.name): $el.items[-1] | mapper } )
  else .
  end
;

.items[1].items | last.items[0].items | mapper + (.[-1].items | mapper) | { title, year: .original_publication_year, author: .author.name }
