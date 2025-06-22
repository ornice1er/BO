interface details {
    name:string,
    slug:string,
    doc_path:string,
    desc:any,
    desc2?:any,
    desc3?:any

}


export const PrestationDetails: details[] = [
    {
        name:"attestation de présence au poste",
        slug:"attestation-de-presence-au-poste",
        doc_path:"docs/adpap",
        desc(selected_data:any){
                return  ` <section style="padding:15px">
                <div class="mb-3">
                   <p> Le Directeur de l'Administration et des Finances du Minitère du Travail et de la Fonction Publique, atteste que:</p>
                </div>
                <div>
                   <p><strong>${selected_data?.adpap.sex} ${selected_data?.adpap.identity},</strong></p>
                </div>
                <div>
                   <table>
                       <tbody>
                           <tr class="mb-3">
                               <td>CORPS :</td>
                               <td><strong>${selected_data?.adpap.corporate}</strong></td>
                           </tr>
                           <tr class="mb-3">
                            <td> MATRICULE :</td>
                            <td><strong>${selected_data?.adpap.identity}</strong></td>
                        </tr>
                        <tr class="mb-3">
                            <td>DIRECTION: </td>
                            <td><strong>${selected_data?.adpap.structure}</strong> </td>
                        </tr>
                       </tbody>
                   </table>
                </div>
        
                <div style="margin-top: 50px; ">
                   <p>est effectivement présent à son poste de travail le <strong>${selected_data?.adpap.date_job} </strong>, date de sa prise de service dans la fonction publique, jusqu'à ce jour.</p>
                </div>
        
                <div style="margin-top: 50px; ">
                   <p> En foi de quoi, la présente attestation lui a été délivrée pour servir et
                    valoir ce que de droit.</p>
                </div>
               
            </section>
        `
        }
        
        
       
    },
    {
        name:"de stage",
        slug:"autorisation-de-stage",
        doc_path:"docs/ads",
        desc(selected_data:any){
                return  ` <div style="margin-top: 15px; ">
                <p class=""><span class="mtab"></span> Monsieur/Madame, ${selected_data.ads.identity} </p>
                <p>
                    <span class="mtab"></span>    J'accuse réception de votre demande de stage  ${selected_data.ads.nature}ci-dessus mentionnée et vous notifie mon accord de principe pour le déroulement dudit stage au sein du ${selected_data.ads.service} de la ${selected_data.ads.structure}, afin de vous permettre de confronter vos connaissances théoriques à celles pratiques.
                </p>
            </div>
  
            <div style="margin-top: 15px; ">
                    <p>
                        <span class="mtab"></span> Ce stage bénévole de trois (0${selected_data.ads.delay}) mois qui s'effectuera du ${selected_data.ads.date_start} au ${selected_data.ads.date_end} n'ouvre pas droit à un recrutement dans la fonction publique et ne vous confère pas la qualité d'agent d'état.</p>
            </div>
           
            <div style="margin-top: 15px; ">
                   <p> <span class="mtab"></span> Recevez, Madame / Monsieur mes meilleures salutations.</p>
            </div>
        `
        },
        desc2(selected_data:any){
            return  ` <div style="margin-top: 15px; ">
            <p class=""><span class="mtab"></span> Monsieur le Directeur, </p>
            <p>
                <span class="mtab"></span>    J'ai l'honneur de vous informer que les étudiants en fin de formation du cycle I de l'ENAM dont les noms figurent dans la liste ci-jointe sont autorisées à effectuer un stage académique de trois (${selected_data.delay}) mois, du ${selected_data.date_start} au ${selected_data.date_end} au Ministère du Travail et de la Fonction Publique ont effectivement démarré le stage dans nos structures.
            </p>
        </div>
      
        <div style="margin-top: 15px; ">
               <p> <span class="mtab"></span> Veuillez agréer, Monsieur le Directeur, l'expression de mes meilleures salutations.</p>
        </div> 
    `
    },
    desc3(selected_data:any){
        return  ` <div style="margin-top: 15px; ">
        <p>
            J'ai l'honneur de mettre à votre disposition pour un stage ${selected_data.ads.nature} du ${selected_data.ads.date_start} au ${selected_data.ads.date_end} , M./Mme ${selected_data.ads.identity}, étudiant(e:any) en fin de formation de ${selected_data.ads.domain} Option: ${selected_data.ads.graduation}à ${selected_data.ads.school}.
        </p>
    </div>

    <div style="margin-top: 15px; ">
            <p>
                Ce stage permettra à l'intéressé d'acquérir des connaissances complémentaires indispensables à la ${selected_data.ads.motif}.
            </p>
    </div>
    <div style="margin-top: 15px; ">
           <p>
            Je tiens à rappeler que l'autorisation qui est accordée d'effectuer le présent stage, ne saurait être assimiée à un recrutement dans la fonction publique.
           </p>
    </div>
    <div style="margin-top: 15px; ">
    <p> En foi de quoi, la présente attestation lui a été délivrée pour servir et
     valoir ce que de droit.</p>
</div>

`
}
        
        
       
    },
    {
        name:"d'attestation de non litige",
        slug:"attestation-de-non-litige",
        doc_path:"docs/atn",
        desc(selected_data:any){
                return  `  <section>
                <div>
                    La Directrice Générale du Travail soussignée atteste que :
                    <p class="articl">${ selected_data.atn.name_structure }
                    </p>
                    <p class="articl">${ selected_data.atn.address_structure }</p>
                    <p class="articl">${ selected_data.atn.rccm }</p>
                    <p class="articl">${ selected_data.atn.ifu }</p>
                </div>
      
                <div style="margin-top: 50px; ">
                    est en règle vis-à-vis de la législation du travail en vigueur en République du Bénin et n'a, à ce jour, aucun litige pendant devant ses services.
                </div>
      
                <div style="margin-top: 50px; ">
                    En foi de quoi, la présente attestation lui a été délivrée pour servir et
                    valoir ce que de droit.
                </div>
      
            </section>
        `
        }
        
        
       
    },
    {
        name:"attestation de stage",
        slug:"attestation-de-stage",
        doc_path:"docs/as",
        desc(selected_data:any){
                return  ` 
                Le Directeur de l’Administration et des Finances du Ministère du Travail et de la Fonction Publique soussigné, atteste que ${selected_data?.identity}, titulaire d’une ${selected_data?.domain}, spécialité: ${selected_data?.graduation}, obtenu à ${selected_data?.school} à effectuer un stage ${selected_data?.nature} de ${selected_data?.delay}, du {${selected_data?.date_start} au {${selected_data?.date_end} à la ${selected_data?.structure}.

                En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.
            
            `
        }
        
        
       
    },
    {
        name:"attestation de service fait",
        slug:"attestation-de-service-fait",
        doc_path:"docs/asf",
        desc(selected_data:any){
                return  ` 
                
            `
        }
        
        
       
    },
    {
        name:"de visa de déclaration d'établissement",
        slug:"declaration-etablissement",
        doc_path:"docs/detab",
        desc(selected_data:any){
                return  ` 
                
            `
        }
        
        
       
    },
    {
        name:"certificat de non raidation",
        slug:"certificat-de-non-radiation",
        doc_path:"docs/cnr",
        desc(selected_data:any){
                return  ` 
                
            `
        }
        
        
       
    },
    {
        name:"d'attestation de validité des services",
        slug:"attestation-de-validite-des-services",
        doc_path:"docs/vsa",
        desc(selected_data:any){
                return  ` 
                
            `
        }
        
        
       
    },
    {
        name:" de visa de contrat d'apprentissage",
        slug:"visa-contrat-apprentisage",
        doc_path:"docs/vca",
        desc(selected_data:any){
                return  ` 
                
            `
        }  
    },
    {
        name:" de règlement intérieur d'entreprise",
        slug:"visa-reglement-interieur-entreprise",
        doc_path:"docs/vri",
        desc(selected_data:any){
                return  ` 
                
            `
        }
        
        
       
    },
    {
        name:" d'autorisation de licenciement",
        slug:"autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel",
        doc_path:"docs/al",
        desc(selected_data:any){
                return  ` 
                
            `
        }
        
        
       
    },
    {
        name:" d'agrément médecin",
        slug:"decision-agrement-exercice-medecin",
        doc_path:"docs/am",
        desc(selected_data:any){
                return  ` Test
                
            `
        }
        
        
       
    },
    {
        name:" d'autorisation de licenciement pour motif économique ou non, salaire protégé ou non ",
        slug:"autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel",
        doc_path:"docs/al",
        desc(selected_data:any){
                return  `
                Aucun contenu disponible pour le momment 
                
            `
        }
        
        
       
    },
]




