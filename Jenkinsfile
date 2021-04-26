pipeline
{
    agent any  
    stages
    {
        stage("Prueba de ejecución de los artefactos.")
        {                           
            steps
            {         
                echo 'Pruebas de construcción de servicio cliente'
                dir('src')
                {
                    dir("cliente") 
                    {                    
                        sh 'npm install'                
                        sh 'npm start'                    
                    }                
                    sh 'forever stopall'                

                    sh 'sleep 3'                
                    dir("esb") 
                    {                    
                        sh 'npm install'                
                        sh 'npm start'                    
                    }
        
                    sh 'sleep 3'                
                    dir("repartidor") 
                    {                    
                        sh 'npm install'                
                        sh 'npm start'                    
                    }

                    sh 'sleep 3'                
                    dir("restaurante") 
                    {                    
                        sh 'npm install'                
                        sh 'npm start'                    
                    }
                }                                                           
            }                                    
        }

        stage("Realización de pruebas unitarias")
        {
            steps
            {

                echo 'Pruebas unitarias'
                dir('src')
                {
                    dir('restaurante')
                    {
                        sh 'mocha test'
                    }
                }                                
            }            
        }

        stage("Realizando pruebas de cobertura  a través de sonarqube ")
        {
            //819cb68dd36cd6f6d15cd792a26b61a459e05c9d
            steps
            {
                echo 'Lanzando prueba con sonarqube scanner.'
                dir('src')
                {
                    dir('restaurante')
                    {
                        sh 'npm test'
                        sh '/usr/bin/sonar-scanner-4.4.0.2170-linux/bin/sonar-scanner \
                            -Dsonar.projectKey=Practica7_SA \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.login=819cb68dd36cd6f6d15cd792a26b61a459e05c9d'
                    }
                }
                sh 'forever stopall'
            }
        }

        stage('Creación de artefactos')
        {
            steps
            {
                echo 'Empaquetando artefactos a través de gulp'
                sh 'npm install gulp'
                sh 'npm install gulp-zip'
                sh 'npm install gulp-clean '
                sh 'npm install gulp-uglify '
                sh 'npm install gulp-copy'
                sh 'npm install gulp-run'
                sh 'gulp --continue'
            }
        }


        stage('Entrega de artefacto')
        {
            steps
            {
                echo 'Copiando artefacto en servidor'
                echo 'Limpiando entregables temporales'
                sh 'gulp limpiar'
            }
        }        


    }
}