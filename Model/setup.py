from setuptools import find_packages,setup

setup(
    name="Medical",
    version='0.0.1',
    author='Mustafa Rizwan',
    author_email='mustafa782a@gmail.com',
    install_requires=['openai','langchain','streamlit','python-dotenv','PyPDF2','pinecone-client','langchain_community','langchain_text_splitters','langchain_pinecone'],
    packages=find_packages()
)