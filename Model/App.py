from flask import Flask, jsonify, request
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore

app = Flask(__name__)

# Initialize Ollama Llama 3 model
llm = Ollama(model="llama3")

# Initialize HuggingFace Embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Initialize Pinecone VectorStore
index_name = "test1"
vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings, namespace="real")

# Initialize RetrievalQA chain
retrieval_qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# Route to handle questions
@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    question = data['question']

    # Run RetrievalQA chain on the question
    answer = retrieval_qa.run(question)

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
