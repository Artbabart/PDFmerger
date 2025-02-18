import os
import PyPDF2

merger = PyPDF2.PdfMerger()

for file in os.listdir(os.curdir):
    if file.endswith(".pdf"):
        merger.append(file)

merger.write("merged_file.pdf")