from flask import Flask, jsonify, request
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
import os
from langchain.prompts import PromptTemplate
import logging

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

logging.basicConfig(level=logging.DEBUG)

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        app.logger.debug(f"Received data: {data}")

        question = data['question']
        app.logger.debug(f"Received question: {question}")

        # Create the retrieval chain
        retrieval_qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            chain_type="stuff"  # or any appropriate chain type
        )

        # Get the answer from the chain
        answer = retrieval_qa_chain.invoke(question)
        app.logger.debug(f"Answer: {answer['result']}")

        return jsonify({'answer': answer['result']})
    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
