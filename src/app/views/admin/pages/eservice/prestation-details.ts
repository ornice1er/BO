import { formatDate } from "@angular/common";

interface details {
    name:string,
    slug:string,
    doc_path:string,
    desc:any,
    desc2?:any,
    desc3?:any

}
export const ConfigDateForm:any={
    toFormatDate(date:any) {
   
        return formatDate(date,'dd MMMM yyyy','fr_FR');
    },
    now() {
   
        return formatDate(new Date(),'dd MMMM yyyy','fr_FR');
    },

    oldDate(date2:Date){
    
            var diff =(new Date(date2). getTime() - new Date(). getTime()) / 1000;
            diff /= (60 * 60 * 24);
            return Math. abs(Math. round(diff/365.25));
    },

    closingDate(date2:Date){
        
        const d = new Date(date2);
        d.setDate(d.getDate() + (55*365));
        return d
    },

    splitGrade(grade:any,index:any){
        if (grade!= undefined || grade!=null) {
            var splitted=grade.split('-');

            if (splitted?.length >0) {
                if (splitted[index] !== undefined) {
                    return splitted[index];
                }else{
                    return ".....";
                }

            }else{
                return ".....";
            }

        }else{
            return ".....";
        }
    }
}


export const PrestationDetails: details[] = [
    {
        name:"attestation de présence au poste",
        slug:"attestation-de-presence-au-poste",
        doc_path:"docs/adpap",
        desc(selected_data:any){
                return  ` <section style="padding:15px">
                <div class="mb-3">
                   <p> Le Directeur de la Planification, de l'Administration et des Finances du Ministère du Travail et de la Fonction Publique, atteste que:</p>
                </div>
                <div>
                   <p><strong>${selected_data?.adpap?.sex} ${selected_data?.adpap?.identity},</strong></p>
                </div>
                <div>
                   <table>
                       <tbody>
                           <tr class="mb-3">
                               <td>CORPS :</td>
                               <td><strong>${selected_data?.adpap?.corporate}</strong></td>
                           </tr>
                           <tr class="mb-3">
                            <td> MATRICULE :</td>
                            <td><strong>${selected_data?.adpap?.matricule}</strong></td>
                        </tr>
                        <tr class="mb-3">
                            <td>DIRECTION: </td>
                            <td><strong>${selected_data?.adpap?.structure?.libelle}</strong> </td>
                        </tr>
                       </tbody>
                   </table>
                </div>
        
                <div style="margin-top: 50px; ">
                   <p>est effectivement présent à son poste de travail le <strong>${ConfigDateForm.toFormatDate(selected_data?.adpap?.date_job)} </strong>, date de sa prise de service dans la fonction publique, jusqu'à ce jour.</p>
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
                    <span class="mtab"></span>    J'accuse réception de votre demande de stage  ${selected_data.ads.nature} ci-dessus mentionnée et vous notifie mon accord de principe pour le déroulement dudit stage au sein de la ${selected_data.ads.structure}, afin de vous permettre de confronter vos connaissances théoriques à celles pratiques.
                </p>
            </div>
  
            <div style="margin-top: 15px; ">
                    <p>
                        <span class="mtab"></span> Ce stage bénévole de (0${selected_data.ads.delay}) mois qui s'effectuera du ${ConfigDateForm.toFormatDate(selected_data.ads.date_start)} au ${ConfigDateForm.toFormatDate(selected_data.ads.date_end)} n'ouvre pas droit à un recrutement dans la fonction publique et ne vous confère pas la qualité d'agent d'état.</p>
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
                <span class="mtab"></span>    J'ai l'honneur de vous informer que les étudiants en fin de formation du cycle I de l'ENAM dont les noms figurent dans la liste ci-jointe sont autorisées à effectuer un stage académique de trois (${selected_data.delay}) mois, du ${ConfigDateForm.toFormatDate(selected_data.date_start)} au ${ConfigDateForm.toFormatDate(selected_data.date_end)} au Ministère du Travail et de la Fonction Publique ont effectivement démarré le stage dans nos structures.
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
            J'ai l'honneur de mettre à votre disposition pour un stage ${selected_data.ads.nature} du ${ConfigDateForm.toFormatDate(selected_data.ads.date_start)} au ${ConfigDateForm.toFormatDate(selected_data.ads.date_end)} , M./Mme ${selected_data.ads.identity}, étudiant(e:any) en fin de formation de ${selected_data.ads.domain} Option: ${selected_data.ads.graduation}à ${selected_data.ads.school}.
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
                    <p class="articl">${ selected_data.phone }</p>
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
                Le Directeur de la Planification, de l’Administration,  et des Finances du Ministère du Travail et de la Fonction Publique soussigné, atteste que Monsieur / Madame ${selected_data?.as.identity}, titulaire d’une ${selected_data?.as.domain}, spécialité: ${selected_data?.as.graduation}, obtenu à ${selected_data?.as.school} a effectué(e) un stage ${selected_data?.as.nature} de __________________, du ___________________________ au ___________________________à la ______________________________.
                <br/>
                En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.
            
            `
        }
        
        
       
    },
    {
        name:"attestation de service fait",
        slug:"attestation-de-service-fait",
        doc_path:"docs/asf",
        desc(selected_data:any){
            if (selected_data?.asf.type=="service") {
                return  ` 
                <div style="text-align: justify;"><span style="font-size: 12.96px;">Je soussigné Sanny LAOUROU, Personne Responsables des Marchés Publics par intérim du Ministère du Travail et de la Fonction Publique, atteste que l'ETS / la société ${selected_data?.asf.name_structure} s'est effectivement acquitté de ses obligations conformément au contrat N° ${selected_data?.asf.ref_marche} du  ${ConfigDateForm.toFormatDate(selected_data.asf.date_contrat)} relatif à la "......................................................................................" pour un montant toutes taxes comprises de...........................................francs CFA.</span></div><div style="text-align: justify;"><span style="font-size: 12.96px;"><br></span></div><div style="text-align: justify;"><span style="font-size: 12.96px;">En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</span></div><div style="text-align: justify;"><br></div>
            `
            } else {
                return  ` 
                <div style="text-align: justify;"><span style="font-size: 12.96px;">Je soussigné Sanny LAOUROU, Personne Responsables des Marchés Publics par intérim, atteste que l'ETS / la société ${selected_data?.asf.name_structure} a exécuté avec satisfaction le contrat n° ${selected_data?.asf.ref_marche} du  ${ConfigDateForm.toFormatDate(selected_data.asf.date_contrat)} relatif à la "......................................................................................" pour un montant toutes taxes comprises de...........................................francs CFA.</span></div><div style="text-align: justify;"><span style="font-size: 12.96px;"><br></span></div><div style="text-align: justify;"><span style="font-size: 12.96px;">En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</span></div><div style="text-align: justify;"><br></div>
            `
            }
             
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
        name:"Visa de contrat nationaux",
        slug:"visa-de-contrat-nationaux",
        doc_path:"docs",
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
                <div><span style="font-size: 12.96px;">Le Directeur de la Réglementation et du Suivi des Carrières certifie que Monsieur ${selected_data?.cnr.adpap?.identity} de l'Etat, numéro matricule ${selected_data?.cnr.adpap?.matricule} de la catégorie ${selected_data?.cnr.adpap?.category} , échelle ${selected_data?.cnr.adpap?.scale}, échelon ${selected_data?.cnr.adpap?.level}, en service au ${selected_data?.cnr.adpap?.structure?.libelle}, né à ${selected_data?.cnr.adpap?.birthplace} le ${ConfigDateForm.toFormatDate(selected_data?.cnr.adpap?.birthday)}, n'est ni candidat au départ volontaire, ni radié de la Fonction Publique Béninoise.</span></div><div><span style="font-size: 12.96px;"><br></span></div><div style="text-align: justify;"><span style="font-size: 12.96px;">En foi de quoi, le présent certificat lui est délivré pour servir et valoir ce que de droit.</span></div> 
                
            `
        }
        
        
       
    },
    {
        name:"d'attestation de validité des services",
        slug:"attestation-de-validite-des-services",
        doc_path:"docs/vsa",
        desc(selected_data:any){
                return  ` 
                <div style="text-align: justify;"><span style="font-size: 12.96px;">Je soussigné Victorin V. HONVO, Directeur de Cabinet du Ministre du Travail et de la Fonction Publique, atteste que ${selected_data?.vsa.sex} ${selected_data?.vsa.identity} né le ${ConfigDateForm.toFormatDate(selected_data?.vsa.birthday)} à ${selected_data?.vsa.birthplace}, est ${selected_data?.vsa.status} de ${selected_data?.vsa.job} de l'Etat en poste au Ministère du Travail et de la Fonction Publique.</span></div><div style="text-align: justify;"><div><span style="font-size: 12.96px;">Les données relatives à sa carrière se déclinent comme suit:</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;"><b>Corps/Emploi</b></span><span style="background-color: transparent; font-size: 0.81rem;">: ${selected_data?.vsa.job}</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;"><b>Grade</b></span><span style="background-color: transparent; font-size: 0.81rem;"><b>:</b> ${selected_data?.vsa.rank}</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;"><b>Numéro matricule : ${selected_data?.vsa.matricule}</b></span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;"><b>Date de prise de service: </b> ${ConfigDateForm.toFormatDate(selected_data?.vsa.job_date)}</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;"><b>Fonction</b></span><span style="background-color: transparent; font-size: 0.81rem;"><b>:</b> ${selected_data?.vsa.function}</span><span style="background-color: transparent; font-size: 0.81rem;"></span></div><div><span style="background-color: transparent; font-size: 0.81rem;"><br></span></div><div><div><span style="font-size: 12.96px;">Ancienneté au ${ConfigDateForm.now()}:${ConfigDateForm.oldDate(selected_data?.vsa.job_date)} an(s)</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;">L'intéressé n'est ni candidat au départ volontaire, ni radié de la fonction publique béninoise. Il fera probablement valoir ses droits à une pension de retraite pour compter du</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;">${ConfigDateForm.toFormatDate(ConfigDateForm.closingDate(selected_data?.vsa.job_date))} pour limite d'âge des cinquante-cinq (55) ans.</span></div><div><span style="font-size: 12.96px;"><br></span></div><div><span style="font-size: 12.96px;">En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</span></div><div><br></div></div></div> 
                
            
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
                return  `<h5><font face="Calibri"><u><b> DECISION</b></u>&nbsp; &nbsp; N°....................../MTFP/DC/SGM/DGAT/DSSMST&nbsp;</font></h5><div><font face="Calibri">&nbsp;portant agrément du Docteur ${selected_data?.am?.identity} en qualité de Médecin d'entreprise&nbsp;</font><div><font face="Calibri"><br></font></div><div style="text-align: left;"><div style="text-align: center;"><font face="Calibri"><b style="background-color: transparent; font-size: 0.81rem;">&nbsp;LE MINISTRE DU TRAVAIL ET DE LA FONCTION PUBLIQUE</b><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;</span></font></div><div style="text-align: center;"><span style="background-color: transparent; font-size: 0.81rem;"><font face="Calibri"><br></font></span></div><h5 style="text-align: left;"><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;Vu la loi n° 90-32 du 11 décembre 1990 portant Constitution de la République du Bénin, telle que modifiée par la loi n° 2019-40 du 07 novembre 2019&nbsp;<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu la loi n° 98-004 du 27 janvier 1998 portant Code du Travail en
                
                République du Bénin<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu la décision portant proclamation, le 21 avril 2021 par la Cour Constitutionnelle, des résultats définitifs de l'élection présidentielle du 11 avril 2021 :&nbsp;<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu le décret n° 2021-257 du 25 mai 2021 portant composition du Gouvernement ;<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu le décret n° 2019-430 du 02 octobre 2019 fixant la structure-type des Ministères ;<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu le décret n° 2020-241 d. 15 avril 2020 portant attributions, organisation et fonctionnement du Ministère du Travail et de la Fonction Publique<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu l'arrêté interministériel n° 2020-024/MTFP/MS/DC/SGM/DSSMST/SMT/011SGG20 du 09 juin 2020 portant attributions, organisation et fonctionnement des services de santé au travail;&nbsp;<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu l'arrêté n° 074/MS/DC/SGM/CTJ/DNSP/SRS/SA/072SGG18 du 24 octobre 2018 portant autorisation de l'exercice en clientèle privée de la profession médicale;<br></span></font><font face="Calibri"><span style="background-color: transparent; font-size: 0.81rem;">&nbsp;vu le Certificat d'Etudes Spécialisées de Santé au Travail du 07 mars 2008 délivré au Docteur ${selected_data?.am?.identity} l'attestation d'inscription à l'Ordre National des Médecins du Bénin
                
                Après avis favorable du Ministre de la Santé, objet de la lettre n' 0564 2021/MS/DC/SGM/DNSP/SRS/SP du 10 juin 2021,</span></font></h5></div><div style="text-align: left;"><span style="background-color: transparent; font-size: 0.81rem;"><font face="Calibri"><br></font></span></div><div><h4 style="color: rgb(73, 80, 70);"><b><font face="Calibri">DECIDE&nbsp;</font></b></h4></div><div><b><font face="Calibri"><br></font></b></div><h5><font face="Calibri"><b><u>Article premier:</u></b>
                
                Monsieur Docteur en Médecine, de Santé au Travail, est agréé en
                
                titulaire du Certificat d'Etudes Spécialisées qualité de Médecin d'Entreprise.</font></h5><h5><font face="Calibri"><br></font></h5><h5><font face="Calibri">&nbsp;<b style="text-decoration-line: underline;">Article 2:&nbsp;</b>&nbsp;Docteur&nbsp;${selected_data?.am?.identity}
                
                Médecin du Travail, doit, dans le cadre de ses interventions en entreprise, assurer une surveillance adéquate du milieu et des conditions de travail et exercer une action médicale préventive sur les travailleurs, conformément aux prescriptions de l'arrêté interministériel n°2020 024/MTFP/MS/DC/SGM/DSSMST/SMT/011SGG20 du 09 juin 2020 portant attributions, organisation et fonctionnement des services de santé au travail.</font></h5><h5><font face="Calibri"><br></font></h5><h5 style="text-align: left;"><font face="Calibri">&nbsp; &nbsp;<u><b>Article 3:</b></u> La présente décision, qui prend effet pour compter de la date de sa signature, sera notifiée à l'intéressé et publiée au Journal officiel.</font></h5><h5 style="text-align: left;"><font face="Calibri"><br></font></h5><h5 style="text-align: right;"><font face="Calibri">&nbsp;Fait à Cotonou, le ..........................................................................</font></h5><div><font face="Calibri"><br></font></div><div><font face="Calibri"><br></font></div><div><font face="Calibri"><br></font></div><div><font face="Calibri"><br></font></div><h5 style="text-align: right;"><font face="Calibri">&nbsp;Adidjatou A. MATHYS&nbsp;</font></h5><h5><font face="Calibri"><br></font></h5><h5 style="text-align: left;"><font face="Calibri">&nbsp;<b><u>Ampliations</u></b></font></h5><h5 style="text-align: left;"><font face="Calibri">JO............................................................... 02&nbsp;</font></h5><h5 style="text-align: left;"><font face="Calibri">PR.............................................................. 01</font></h5><h5 style="text-align: left;"><font face="Calibri">SGG........................................................... 01</font></h5><h5 style="text-align: left;"><font face="Calibri">A.N............................................................. 01</font></h5><h5 style="text-align: left;"><font face="Calibri">CC............................................................... 01</font></h5><h5 style="text-align: left;"><font face="Calibri">CS............................................... ............... 01</font></h5><h5 style="text-align: left;"><font face="Calibri">CES ............................................................ 01</font></h5><h5 style="text-align: left;"><font face="Calibri">MTFP ......................................................... 06</font></h5><h5 style="text-align: left;"><font face="Calibri">MS............................................................... 06</font></h5><h5 style="text-align: left;"><font face="Calibri">TOUS AUTRES MINISTERES ............ 23</font></h5><h5 style="text-align: left;"><font face="Calibri">CCIB .......................................................... 02</font></h5><h5 style="text-align: left;"><font face="Calibri">CNP-BENIN ............................................ 02</font></h5><h5 style="text-align: left;"><font face="Calibri">CONEB ..................................................... 02</font></h5><h5 style="text-align: left;"><font face="Calibri">SYNDICATS............................................. 10</font></h5><h5 style="text-align: left;"><font face="Calibri">TOUTES DIRECTIONS/MTFP............. 20</font></h5></div>                
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




