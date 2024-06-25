from flask import Flask, jsonify, request
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
import os

app = Flask(__name__)

# Ensure Pinecone API key is set in the environment
os.environ['PINECONE_API_KEY'] = '39c3b55b-2ae4-44ee-a9cd-83a99876c828'

# Initialize Ollama Llama 3 model
llm = Ollama(model="llama3")

# Initialize HuggingFace Embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Initialize Pinecone VectorStore
index_name = "test1"
vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings, namespace="real")



# Route to handle questions
@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        question = data['question']

        question_answer_chain = create_stuff_documents_chain(llm, question)
        chain = create_retrieval_chain(vectorstore.as_retriever(), question_answer_chain)
        answer = chain.invoke(question)

        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port= 8080)
