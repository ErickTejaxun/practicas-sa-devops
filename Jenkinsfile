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
            }                                    
        }

        stage("Ejecución de artefactos")
        {
            steps
            {                
                sh 'dockre-compose up -d'                                            
            }            
        }
    }    
}