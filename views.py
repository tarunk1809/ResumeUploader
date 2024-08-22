import re

import pdfplumber
from PyPDF2 import PdfReader
from django.http import JsonResponse
from rest_framework.views import APIView

from .serializers import PDFUploadSerializer


def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text
def separate_sections(text):
    sections = {
        "ContactInformation": "",
        "Summary": "",
        "Education": "",
        "WorkHistory": "",
        "Skills": "",
        "Certifications": "",
        "Training": "",
    }
    # Simple keyword-based separation
    contact_info_match = re.search(r'Contact Information:\n(.*?)(\n\n|$)', text, re.DOTALL)
    if contact_info_match:
        sections["ContactInformation"] = contact_info_match.group(1).strip()
    summary_match = re.search(r'Summary:\n(.*?)(\n\n|$)', text, re.DOTALL)
    if summary_match:
        sections["Summary"] = summary_match.group(1).strip()
    education_match = re.search(r'Education\n(.*?)(\n\n|$)', text, re.DOTALL)
    if education_match:
        sections["Education"] = education_match.group(1).strip()
    work_experience_match = re.search(r'Work History\n(.*?)(\n\n|$)', text, re.DOTALL)
    if work_experience_match:
        sections["WorkHistory"] = work_experience_match.group(1).strip()
    skills_match = re.search(r'Skills\n(.*?)(\n\n|$)', text, re.DOTALL)
    if skills_match:
        sections["Skills"] = skills_match.group(1).strip()
    return sections
def home():
    return JsonResponse({"Welcome to Python"})

class UploadResume(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data['file']
            print(uploaded_file.name)

        pdf_reader = PdfReader(uploaded_file)
        num_pages = len(pdf_reader.pages)
        text = ""
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() or ""

        sections = separate_sections(text)
        print("sections", sections)
        return JsonResponse(sections)