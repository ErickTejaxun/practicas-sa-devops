pipeline
{
    agent any  
    stages
    {
        
        stage("Creación de artefactos")
        {                           
            steps
            {         
                echo 'Creando artefactos'
                sh 'docker-compose down'
                sh 'docker-compose build'                                                          
            }                                    
        }

        stage("Ejecución de artefactos")
        {
            steps
            {
                echo 'Pruebas unitarias'
                sh 'dockre-compose up -d'                                            
            }            
        }    
}