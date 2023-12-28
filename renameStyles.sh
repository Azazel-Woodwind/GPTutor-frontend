#!/bin/bash

# Find all files named 'styles.js' in the current directory and its subdirectories
find . -type f -name "styles.js" | while read file; do
    # Extract the parent directory name
    dir=$(dirname "$file")
    parentdir=$(basename "$dir")

    # Construct the new file name
    newfile="${dir}/${parentdir}.styles.js"

    # Rename the file
    mv "$file" "$newfile"
done
