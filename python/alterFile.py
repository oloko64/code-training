import fileinput

files = ("bashrc.txt")

search_alias = "gc"

# Does a list of files, and redirects STDOUT to the file in question
for line in fileinput.input(files, inplace=1):
    print(line.replace(f'alias {search_alias}=', "bar").rstrip())
