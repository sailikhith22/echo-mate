pipeline {
    agent any  // Use any available agent

    environment {
        GIT_REPO = 'https://github.com/sailikhith22/echo-mate.git'
        IMAGE_NAME = node:18  // Base name for your Docker image
        IMAGE_TAG = 'saigaduthopu'  // Tag for your Docker image
        K8S_DEPLOYMENT_FILE = 'deployment.yml'  // Path to your Kubernetes deployment file
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credentials ID for Docker Hub
        APP_PATH = '/home/echo-mate'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git branch: 'main', url: "${GIT_REPO}"  // Clone the Git repository
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with a specific tag
                    sh """
                    cd ${APP_PATH}
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the built image to Docker Hub using docker push directly
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                        echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        """            }
                }
            }
        }
        stage('Run Container in Detached Mode') {
            steps {
                script {
                    // Run the container in detached mode
                    sh """
                    docker run -d --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy the application to Kubernetes using kubectl
                    sh """
                    kubectl apply -f ${K8S_DEPLOYMENT_FILE}
                    """
                }
            }
        }
        
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}


