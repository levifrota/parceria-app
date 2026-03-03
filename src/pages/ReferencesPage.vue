<template>
  <q-page class="references-page">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>Referências Bibliográficas</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="q-pa-md">
      <div class="text-caption text-grey-6 q-mb-md">
        {{ references.length }} referências — toque em uma referência com
        <q-icon name="open_in_new" size="12px" /> para abrir o link.
      </div>

      <div
        v-for="(ref, index) in references"
        :key="index"
        class="reference-card q-mb-md"
        :class="ref.url ? 'reference-card--link' : ''"
        @click="ref.url ? openLink(ref.url) : null"
      >
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <p class="reference-text q-ma-none">
              {{ ref.text }}
            </p>
            <div v-if="ref.url" class="reference-url q-mt-sm">
              <q-icon name="open_in_new" size="12px" class="q-mr-xs" />
              <span class="url-text">{{ ref.url }}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="text-center text-grey-6 q-py-md">
        <p class="text-caption">© {{ currentYear }} Parceria App. Todos os direitos reservados.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { openURL } from 'quasar'

const currentYear = new Date().getFullYear()

function openLink(url) {
  openURL(url)
}

const references = [
  {
    text: "ARKSEY, H.; O'MALLEY, L. Scoping studies: towards a methodological framework. International journal of social research methodology, v. 8, n. 1, p. 19–32, 2005. Disponível em: <https://www.york.ac.uk/inst/spru/pubs/pdf/Scopingstudies.pdf>. Acesso em: 19 jun. 2024.",
    url: 'https://www.york.ac.uk/inst/spru/pubs/pdf/Scopingstudies.pdf',
  },
  {
    text: 'BARDIN, Laurence. Análise de Conteúdo. Ed. 70, São Paulo, 2016.',
    url: null,
  },
  {
    text: 'BENASSI, C.B.P; CANCIAN, Q.G; STRIEDER, D.M. Estudo piloto: Um instrumento primordial para a pesquisa de percepção da ciência. Ens. Tecnol. R., Londrina, v. 7, n. 1, p. 210-225, jan./abr. 2023. Disponível em: https://periodicos.utfpr.edu.br/etr/article/view/16725. Acesso em: 22 set. 2024.',
    url: 'https://periodicos.utfpr.edu.br/etr/article/view/16725',
  },
  {
    text: 'BERNARDI, D.; MELLO, R.; FÉRES-CARNEIRO, T. Participação paterna no pré-natal, parto e pós-parto: Um estudo sobre a perspectiva do pai. Psico, v. 54, n. 1, p. e39414, 2023.',
    url: null,
  },
  {
    text: 'BONICA, J. J. The nature of the pain of parturition. In: BONICA, J. J.; MCDONALD, J. S. (ed.). Principles and practice of obstetric analgesia and anesthesia. Baltimore: Williams & Wilkins, 1995. p. 243-273.',
    url: null,
  },
  {
    text: 'BOSSARDI, C. N.; GOMES, L. B.; BOLZE, S. D. A.; CREPALDI, M. A.; VIEIRA, M. L. Desafios de ser pai em uma sociedade em transformação. In: MOREIRA, L. V. C.; RABINOVICH, E. P.; ZUCOLOTO, P. C. S. V. (org.). Paternidade e sociedade contemporânea: o envolvimento paterno e as mudanças na família. Curitiba: Juruá, 2016. p. 81-100.',
    url: null,
  },
  {
    text: 'BRASIL. Ministério da Saúde. Conselho Nacional de Saúde. Resolução n° 466, de 12 de dezembro de 2012. Aprova diretrizes e normas regulamentadoras de pesquisas envolvendo seres humanos. Diário Oficial da União, Brasília (DF), 2012. Disponível em: <http://conselho.saude.gov.br/resolucoes/2012/Reso466.pdf>. Acesso em: 24 set. 2024.',
    url: 'http://conselho.saude.gov.br/resolucoes/2012/Reso466.pdf',
  },
  {
    text: 'BRASIL. Ministério da Saúde. Conselho Nacional de Saúde. Resolução no 510, de 7 de abril de 2016. Diário Oficial da União, Brasília (DF), 2016. Disponível em: https://bvsms.saude.gov.br/bvs/saudelegis/cns/2016/res0510_07_04_2016.html. Acesso em: 24 set. 2024.',
    url: 'https://bvsms.saude.gov.br/bvs/saudelegis/cns/2016/res0510_07_04_2016.html',
  },
  {
    text: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Guia do pré-natal do parceiro para profissionais de saúde. Brasília: Ministério da Saúde, 2023. Acesso em: 02 jan. 2026.',
    url: null,
  },
  {
    text: 'BRASIL. Ministério da Saúde. Secretaria de Ciência, Tecnologia e Insumos Estratégicos. Departamento de Gestão e Incorporação de Tecnologias em Saúde. Diretrizes Nacionais de Assistência ao Parto Normal: versão resumida. Brasília, DF: Ministério da Saúde, 2017. Disponível em: http://bvsms.saude.gov.br/. Acesso em: 20 mar. 2025.',
    url: 'http://bvsms.saude.gov.br/',
  },
  {
    text: 'BRASIL. Ministério da Saúde. Secretaria de Atenção Primária à Saúde. Departamento de Ações Programáticas Estratégicas. Diretriz Nacional de Assistência ao Parto Normal: versão preliminar. Brasília: Ministério da Saúde, 2022. Disponível em: http://189.28.128.100/dab/docs/portaldab/publicacoes/diretriz_assistencia_parto_normal.pdf. Acesso em: 20 mar. 2025.',
    url: 'http://189.28.128.100/dab/docs/portaldab/publicacoes/diretriz_assistencia_parto_normal.pdf',
  },
  {
    text: 'CARVALHO, A. B. Políticas de apoio à família e à paternidade: uma visão comparada entre as políticas norte-americanas e brasileiras. In: MOREIRA, L. V. C.; RABINOVICH, E. P.; ZUCOLOTO, P. C. S. V. (org.). Paternidade e sociedade contemporânea: o envolvimento paterno e as mudanças na família. Curitiba: Juruá, 2016. p. 315-333.',
    url: null,
  },
  {
    text: 'CAVALCANTI, T. R. L.; HOLANDA, V. R. Participação paterna no ciclo gravídico-puerperal e seus efeitos sobre a saúde da mulher. Enfermagem em Foco, v. 10, n. 1, p. 93-98, 2019. Disponível em: http://revista.cofen.gov.br/index.php/enfermagem/article/view/1446. Acesso em: 26 mar. 2025.',
    url: 'http://revista.cofen.gov.br/index.php/enfermagem/article/view/1446',
  },
  {
    text: 'CUNNINGHAM, G.; LEVENO, K.; BLOOM, S.; SPONG, C. et al. Williams Obstetrics. 25. ed. Nova Iorque: McGraw-Hill Education, 2018.',
    url: null,
  },
  {
    text: 'DINIZ, C. S. G. et al. Implementação da presença de acompanhantes durante a internação para o parto: dados da pesquisa nacional Nascer no Brasil. Cadernos de Saúde Pública, São Paulo, v. 30, p. S140-S153, 2014. Suplemento 1. DOI: 10.1590/0102-311X00127013. Acesso em: 20 jun. 2024.',
    url: 'https://doi.org/10.1590/0102-311X00127013',
  },
  {
    text: 'DODOU, D. A et al. Contribuição do acompanhante para a humanização do parto percepções de puérperas. Escola Anna Nery Revista de Enfermagem 18(2) abr/Jun 2014. Disponível em: https://www.scielo.br/j/ean/a/4h4kSrYGq9VzZxnZzFHpDQw/?format=pdf&lang=pt. Acesso em: 20 jun 2024.',
    url: 'https://www.scielo.br/j/ean/a/4h4kSrYGq9VzZxnZzFHpDQw/?format=pdf&lang=pt',
  },
  {
    text: 'FEHRING, R. J. The Fehring model. In: Carrol-Johnson RM, Paquete M. Classification of nursing diagnoses: proceeding of the tenth conference. Philadelphia, EUA: Lippincott Company; 1994. ISBN-10: 0397550111.',
    url: null,
  },
  {
    text: 'FILATRO, Andrea. Design instrucional contextualizado. 2. ed. São Paulo: SENAC, 2007.',
    url: null,
  },
  {
    text: 'FILHO, J. A. et al. Uso de tecnologias educativas para promoção do parto seguro. Saúde Coletiva (Edição Brasileira), v. 13, n. 88, p. 13121-13134, 2023. Disponível em: https://doi.org/10.36489/saudecoletiva.2023v13i88p13121-13134. Acesso em: 26 mar. 2025.',
    url: 'https://doi.org/10.36489/saudecoletiva.2023v13i88p13121-13134',
  },
  {
    text: 'FITERMAN, H. et al. O pai na gestação, no parto e aos três meses de vida do primeiro filho. Polis (Santiago), v. 17, n. 50, p. 47–68, 1 ago. 2018.',
    url: null,
  },
  {
    text: 'FLICK, Uwe. Introdução à pesquisa qualitativa. Tradução Joice Elias Costa. 3. ed. Porto Alegre: Artmed, 2009.',
    url: null,
  },
  {
    text: 'FRID, G.; BOGAERT, K.; CHEN, K. Mobile health apps for pregnant women: systematic search, evaluation, and analysis of features. Journal of Medical Internet Research, v. 23, n. 10, e25667, 2021. DOI: 10.2196/25667. Disponível em: https://www.jmir.org/2021/10/e25667. Acesso em: 02 mar. 2026.',
    url: 'https://www.jmir.org/2021/10/e25667',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. A dor no parto: significados e manejo. Rio de Janeiro, 2018. Disponível em: https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/a-dor-no-parto-significados-e-manejo/. Acesso em: 26 mar. 2025.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/a-dor-no-parto-significados-e-manejo/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Rio de Janeiro: Fiocruz, [2017]. Disponível em: https://portaldeboaspraticas.iff.fiocruz.br/. Acesso em: 20 fev. 2026.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/',
  },
  {
    text: 'GALVÃO, E. C. F.; PÜSCHEL, V. A. A. Aplicativo multimídia em plataforma móvel para o ensino da mensuração da pressão venosa central. Revista da Escola de Enfermagem da USP, v. 46, n. spe, p. 107–115, out. 2012.',
    url: null,
  },
  {
    text: 'GASKIN, Ina May. Guia do Parto. Tradução de Laura Lima. 1. ed. São Paulo: Editora Matrescência, 2023.',
    url: null,
  },
  {
    text: 'HONNEF, F; SILVEIRA, S; QUADROS, J.S.de; LANGENDORF, T.F; PAULA, C.C.de; PADOIN, S.M.deM. Tecnologias educacionais para promoção de experiência de parto positiva: revisão integrativa. Ciência, Cuidado e Saúde, v. 21, 9 fev. 2023. Disponível em: http://www.revenf.bvs.br/scielo.php?script=sci_arttext&pid=S1677-38612022000100306&lng=pt&nrm=iso. Acesso em: 20 fev. 2026.',
    url: 'http://www.revenf.bvs.br/scielo.php?script=sci_arttext&pid=S1677-38612022000100306&lng=pt&nrm=iso',
  },
  {
    text: 'IWAYA, L. H. et al. Early Labour App: developing a practice-based mobile health application for digital early labour support. International Journal of Medical Informatics, v. 177, art. 105139, 2023. Acesso em: 02 mar. 2026.',
    url: null,
  },
  {
    text: "JOANNA BRIGGS INSTITUTE (JBI). Reviewers' Manual-Methodology for JBI Mixed Methods Systematic Reviews. Adelaide: JBI, 2014. Acesso em: 12 set. 2024.",
    url: null,
  },
  {
    text: 'JONES, L. et al. Manejo da dor para mulheres em trabalho de parto: uma visão geral das revisões sistemáticas. Sistema de Banco de Dados Cochrane Rev., v. 2012, n. 3, CD009234, 2012. Disponível em: https://doi.org/10.1002/14651858.CD009234. Acesso em: 26 mar. 2025.',
    url: 'https://doi.org/10.1002/14651858.CD009234',
  },
  {
    text: 'KORDI, M.; GOLMAKANI, A.; RABIEI MOTLAGH, E.; ZAHEDIFAR, T.; BADIEI AVVAL, SH. Abordagens não farmacológicas para aliviar a dor do parto. 2. ed. Mashhad: Mashhad University of Medical Sciences, 2017.',
    url: null,
  },
  {
    text: 'KRISHNAMURTI, T.; DAVIS, A. L.; WONG-PARODI, G.; FISCHHOFF, B.; SADOVSKY, Y.; SIMHAN, H. N. Development and testing of the MyHealthyPregnancy app: a behavioral decision research-based tool for assessing and communicating pregnancy risk. JMIR Mhealth Uhealth, v. 5, n. 4, e42, 2017. Disponível em: https://mhealth.jmir.org/2017/4/e42/. Acesso em: 26 mar. 2025.',
    url: 'https://mhealth.jmir.org/2017/4/e42/',
  },
  {
    text: 'LEITE, S.S; ÁFIO, A.C.E; CARVALHO, L.V; SILVA, J.M; ALMEIDA, P.C; PAGLIUCA, L.M.F. Construction and validation of an Educational Content Validation Instrument in Health. Revista Brasileira de Enfermagem, v. 71, n. 4, p. 1635-41, 2018. Disponível em: https://www.scielo.br/j/reben/a/xs83trTCYB6bZvpccTgfK3w/?lang=en. Acesso em: 07 mar. 2025.',
    url: 'https://www.scielo.br/j/reben/a/xs83trTCYB6bZvpccTgfK3w/?lang=en',
  },
  {
    text: 'LOBIONDO-WOOD, G.; HARBER, J. Pesquisa em enfermagem: método, avaliação crítica e utilização. 4. ed. Rio de Janeiro: Guanabara Koogan, 2001.',
    url: null,
  },
  {
    text: 'LOWE, K. N. The nature of labor pain. American Journal of Obstetrics and Gynecology, v. 186, supl., p. S16–S24, 2002.',
    url: null,
  },
  {
    text: 'MACÊDO, W. P. D.; LIMA, B. S. M. R.; TAVARES, L. M.; SOUZA, C. M. Identificando a educação perinatal ofertada às gestantes pela equipe de enfermagem. Healthy Society, v. 1, n. 2, 2021. Disponível em: https://periodicojs.com.br/index.php/hs/article/view/319. Acesso em: 25 mar. 2025. doi: https://doi.org/10.51249/hes01.02.2021.319.',
    url: 'https://periodicojs.com.br/index.php/hs/article/view/319',
  },
  {
    text: 'MACHADO, Flávia Cristina; PRADO LIMA, Maria de Fátima Webber. O Uso da Tecnologia Educacional: Um Fazer Pedagógico no Cotidiano Escolar. Scientia cum Industria, v. 5, n. 2, p. 44–50, 2017. Disponível em: https://sou.ucs.br/etc/revistas/index.php/scientiacumindustria/article/view/5280. Acesso em: 26 mar. 2025.',
    url: 'https://sou.ucs.br/etc/revistas/index.php/scientiacumindustria/article/view/5280',
  },
  {
    text: 'MATA, Júnia Aparecida Laia da; SILVA, Luciano Barroso Oliveira da; ROCHA, Cristianne Maria Famer. Informações sobre trabalho de parto e nascimento disponíveis em aplicativos de smartphones. Revista Enfermagem Atual in Derme, Rio de Janeiro, v. 98, n. 02, e024288, 2024. Disponível em: https://revistaenfermagematual.com.br/index.php/revista/article/view/2000. Acesso em: 25 mar. 2025.',
    url: 'https://revistaenfermagematual.com.br/index.php/revista/article/view/2000',
  },
  {
    text: 'MATOS, M. G.; MAGALHÃES, A. S.; FÉRES-CARNEIRO, T.; MACHADO, R. N. Construindo o vínculo pai-bebê: a experiência dos pais. Psico-USF, v. 22, n. 2, p. 261-271, 2017a. Disponível em: https://doi.org/10.1590/1413-82712017220206. Acesso em: 26 mar. 2025.',
    url: 'https://doi.org/10.1590/1413-82712017220206',
  },
  {
    text: 'MCGOLDRICK, M.; SHIBUSAWA, T. O ciclo vital familiar. In: WALSH, F. (org.). Processos normativos da família: diversidade e complexidade. Porto Alegre: Artmed, 2016. p. 375-398.',
    url: null,
  },
  {
    text: 'MENDES, S. C.; SANTOS, K. C. B. Pré-natal masculino: a importância da participação do pai nas consultas de pré-natal. Enciclopédia Biosfera, v. 16, n. 29, p. 2120-2133, 2019. Disponível em: https://dx.doi.org/10.18677/EnciBio_2019A163. Acesso em: 26 mar. 2025.',
    url: 'https://dx.doi.org/10.18677/EnciBio_2019A163',
  },
  {
    text: "MONGUILHOTT, J. J. C.; BRÜGGEMANN, O. M.; FREITAS, P. F.; D'ORSI, E. Nascer no Brasil: a presença do acompanhante favorece a aplicação das boas práticas na atenção ao parto na região Sul. Revista de Saúde Pública, v. 52, p. 1, 2018.",
    url: null,
  },
  {
    text: 'MOTA, N.P; VIEIRA C.M.A; NASCIMENTO, M.N.R; BEZERRA, A.M; QUIRINO, G.S; FÉLIX, N.D.C. Aplicativo móvel para o ensino da Classificação Internacional para a Prática de Enfermagem. Revista Brasileira de Enfermagem, v. 72, n. 4, p. 1020–1027, jul. 2019. Disponível em: https://www.scielo.br/j/reben/a/tCbvbjnSBpm9RJyyH77tKhd/?lang=pt. Acesso em: 20 fev. 2026.',
    url: 'https://www.scielo.br/j/reben/a/tCbvbjnSBpm9RJyyH77tKhd/?lang=pt',
  },
  {
    text: 'MUNN, Z.; PETERS, M. D. J.; STERN, C.; TUFANARU, C.; MCARTHUR, A.; AROMATARIS, E. Systematic review or scoping review? Guidance for authors when choosing between a systematic or scoping review approach. BMC Medical Research Methodology, v. 18, n. 143, 2018. Disponível em: https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-018-0611-x. Acesso em: 19 jun. 2024.',
    url: 'https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-018-0611-x',
  },
  {
    text: "NOGUEIRA, A. G.; ARAÚJO, C. L. F.; CORREIRA, L. O. G. S. Women's perception about patient escort in labor. Brazilian Journal of Health Review, v. 3, n. 4, p. 11316-11327, 2020. DOI: https://doi.org/10.34119/bjhrv3n4-377. Acesso em: 26 mar. 2025.",
    url: 'https://doi.org/10.34119/bjhrv3n4-377',
  },
  {
    text: 'NOUR, G.F.A; SILVA, M.A.M; SOUSA, A.J.C; MOREIRA, A.C.A; FREITAS, C.A.S.L; COELHO, T.S; BRITO, J.O; DAMASCENO, A.K.de C. Educational technology to promote father involvement in childbirth and birth. Revista Brasileira de Enfermagem, v. 75, 2022. Disponível em: https://www.scielo.br/j/reben/a/MQsHngCzZKqCzjztkHkyqjk/?format=pdf&lang=pt. Acesso em: 20 fev. 2026.',
    url: 'https://www.scielo.br/j/reben/a/MQsHngCzZKqCzjztkHkyqjk/?format=pdf&lang=pt',
  },
  {
    text: 'NOUR, G. F. A.; SILVA, P. do N.; COELHO, T. da S.; MELO, L. P. T. de; BRITO, J. O.; DAMASCENO, A. K. de C. Experiência Paterna com a Participação no Parto e Nascimento. Saúde Coletiva (Barueri), v. 16, n. 102, p. 17770–17781, 2025. DOI: 10.36489/saudecoletiva.2025v16i102p17770-17781. Disponível em: https://revistasaudecoletiva.com.br/index.php/saudecoletiva/article/view/3648. Acesso em: 02 mar. 2026.',
    url: 'https://revistasaudecoletiva.com.br/index.php/saudecoletiva/article/view/3648',
  },
  {
    text: 'PARDO, M.; MILLER, R. Noções básicas de anestesia. 7. ed. Nova Iorque: Elsevier, 2017.',
    url: null,
  },
  {
    text: 'PEREIRA, D. B.; CARVALHO, I.L.N.; PENHA, J.C.; MIRANDA, A.M.L.; JORGE, H.M.F.; ABREU, I.M.; SARMENTO, A.V. Participação paterna no trabalho de parto e parto. Rev baiana enferm., v. 36, e. 45538, 2022. Acesso em: 02 mar. 2026.',
    url: null,
  },
  {
    text: 'PEREZ, M. P.; OLIVEIRA, N. C. F.; REIS, Z. S. N. Aplicações da saúde digital no cuidado obstétrico: impactos e perspectivas que extrapolam a pandemia de COVID-19. Revista de Medicina (São Paulo), v. 102, n. 4, e199087, jul./ago. 2023. Acesso em: 02 mar. 2026.',
    url: null,
  },
  {
    text: 'PETERS, M.D.J. et al. Scoping Reviews: 2020 version. In: Aromataris E, Munn Z, editors. JBI manual for evidence synthesis. Adelaide: JBI; 2020. Disponível em: https://doi.org/10.46658/JBIMES-20-12. Acesso em: 19 jun. 2024.',
    url: 'https://doi.org/10.46658/JBIMES-20-12',
  },
  {
    text: 'POLIT, D.F; BECK, C.T. Fundamentos de pesquisa em enfermagem: Avaliação de Evidências para a Prática da Enfermagem. 9. ed. Porto Alegre: Artmed, 2018. 456p.',
    url: null,
  },
  {
    text: 'ROBERTS, S.; CHABOYER, W.; GONZALEZ, R.; MARSHALL, A. Using technology to engage hospitalised patients in their care: a realist review. BMC Health Services Research, v. 17, n. 1, p. 388, 2017.',
    url: null,
  },
  {
    text: 'ROCHA-COUTINHO, M. L. Investimento da mulher no mercado de trabalho: repercussões na família e nas relações de gênero. In: FÉRES-CARNEIRO, T. (org.). Família e casal: parentalidade e filiação em diferentes contextos. Campinas: Prospectiva, 2015. p. 103-118.',
    url: null,
  },
  {
    text: 'SALVADOR, P.T.C.O; MARIZ C.M.S; VITOR, A.F; FERREIRA Jr, M.A; FERNANDES, M.I.D; MARTINS, J.C.A; SANTOS, V.E.P. Validação de objeto virtual de aprendizagem para apoio ao ensino da sistematização da assistência de enfermagem. Revista brasileira de enfermagem, v. 71, p. 11-19, 2018. Acesso em: 24 set. 2024.',
    url: null,
  },
  {
    text: 'SANTOS, A. M. D.; LOPES, R. H.; ALVES, K. Y. A.; OLIVEIRA, L. V. E.; SALVADOR, P. T. C. DE O. Análise do Conceito "Tecnologia Educacional" na Área da Saúde. EaD em Foco, v. 12, n. 2, p. e1675, 2022. DOI: 10.18264/eadf.v12i2.1675. Disponível em: https://eademfoco.cecierj.edu.br/index.php/Revista/article/view/1675. Acesso em: 20 jun. 2024.',
    url: 'https://eademfoco.cecierj.edu.br/index.php/Revista/article/view/1675',
  },
  {
    text: 'SILVA, K. T. V. DA; GERVASIO, M. D. G.; CUENCA, A. M. B. Lei do acompanhante na mídia: a pandemia e suas implicações nos direitos do parto. Saúde Soc, p. e220540pt, 2023. Acesso em: 20 jun. 2024.',
    url: null,
  },
  {
    text: 'SILVA, Márcia Christina da et al. A participação do homem/pai no acompanhamento da assistência no período gravídico puerperal. Caderno de Graduação - Ciências Biológicas e da Saúde - UNIT-ALAGOAS, v. 5, n. 3, p. 105-105, 2019. Disponível em: https://periodicos.set.edu.br/fitsbiosaude/article/view/6467. Acesso em: 24 set. 2022.',
    url: 'https://periodicos.set.edu.br/fitsbiosaude/article/view/6467',
  },
  {
    text: 'SIMKIN, P.; BOLDING, A. Atualização sobre abordagens não farmacológicas para aliviar a dor do parto e prevenir o sofrimento. Jornal Saúde da Mulher Obstétrica, v. 49, n. 6, p. 489–504, 2004.',
    url: null,
  },
  {
    text: "SIMKIN, P. P.; O'HARA, M. Alívio não farmacológico da dor durante o trabalho de parto: revisões sistemáticas de cinco métodos. American Journal of Obstetrics and Gynecology, v. 186, n. 5, p. S131–S159, 2002. Disponível em: https://doi.org/10.1067/mob.2002.122382. Acesso em: 26 mar. 2025.",
    url: 'https://doi.org/10.1067/mob.2002.122382',
  },
  {
    text: 'SOUZA, F. M.; SANTOS, W. N.; DANTAS, J. C.; SOUSA, H. R.; MOREIRA, O. A.; SILVA, R. A. Desenvolvimento de aplicativo móvel para o acompanhamento pré-natal e validação de conteúdo. Acta Paulista de Enfermagem, v. 35, eAPE01861, 2022.',
    url: null,
  },
  {
    text: 'SOUZA, M.T; SILVA, M.D; CARVALHO, R. Revisão integrativa: o que é e como fazer. Einstein, v. 8, São Paulo, jan./mar. 2010. Disponível em: https://www.scielo.br/j/eins/a/ZQTBkVJZqcWrTT34cXLjtBx/?lang=en. Acesso em: 24 set. 2024.',
    url: 'https://www.scielo.br/j/eins/a/ZQTBkVJZqcWrTT34cXLjtBx/?lang=en',
  },
  {
    text: 'TCHECO, I.; FUCHS, P.; FUCHS, A.; LOREK, M.; TOBOLSKA-LOREK, D.; DROSDZOL-COP, A. et al. Métodos farmacológicos e não farmacológicos de alívio da dor do parto: estabelecimento de eficácia e comparação. International Journal of Environmental Research and Public Health, v. 15, n. 12, p. 2792, 2018. Disponível em: https://doi.org/10.3390/ijerph15122792. Acesso em: 26 mar. 2025.',
    url: 'https://doi.org/10.3390/ijerph15122792',
  },
  {
    text: 'TELES, L. M. R. Construção e validação de tecnologia educativa para acompanhantes durante o trabalho de parto e parto. 2011. 110 f. Dissertação (Mestrado em Enfermagem) — Universidade Federal do Ceará, Fortaleza, 2011. Acesso em: 02 mar. 2025.',
    url: null,
  },
  {
    text: 'VÉRAS, É. A.; MEDEIROS DE OLIVEIRA, F. P. Políticas públicas para a maternidade: uma análise das licenças por maternidade e paternidade à luz da igualdade e da sustentabilidade social. Revista de Direito do Trabalho, v. 3, n. 1, p. 115-134, 2017. Disponível em: https://www.indexlaw.org/index.php/revistadtmat/article/view/1805. Acesso em: 26 mar. 2025.',
    url: 'https://www.indexlaw.org/index.php/revistadtmat/article/view/1805',
  },
  {
    text: 'WORLD HEALTH ORGANIZATION (WHO). WHO recommendations: intrapartum care for a positive childbirth experience. Geneva: WHO, 2018.',
    url: null,
  },
  {
    text: 'WHO. eHealth. Genebra: WHO, 2012. Disponível em: http://www.who.int/ehealth/en. Acesso em: 20 fev. 2026.',
    url: 'http://www.who.int/ehealth/en',
  },
  {
    text: 'WORLD HEALTH ORGANIZATION (WHO). WHO safe childbirth checklist implementation guide: improving the quality of facility-based delivery for mothers and newborns. Genebra: Organização Mundial da Saúde, 2017. Licença: CC BY-NC-SA 3.0 IGO.',
    url: null,
  },
]
</script>

<style scoped>
.references-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.reference-card {
  width: 100%;
}

.reference-card--link {
  cursor: pointer;
}

.reference-card--link:active .q-card {
  opacity: 0.8;
}

.reference-text {
  font-size: 0.875rem;
  line-height: 1.6;
  text-align: justify;
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
  hyphens: auto;
}

.reference-url {
  display: flex;
  align-items: flex-start;
  color: var(--q-primary);
  font-size: 0.75rem;
}

.url-text {
  word-break: break-all;
  overflow-wrap: anywhere;
  flex: 1;
}
</style>
