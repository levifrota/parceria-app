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
    text: 'AGÊNCIA NACIONAL DE SAÚDE SUPLEMENTAR (ANS). Guia da gestante: passo a passo para um parto adequado. Rio de Janeiro: ANS, 2016. Disponível em: https://www.gov.br/ans/pt-br/assuntos/gestaosaude/parto-adequado-1.',
    url: 'https://www.gov.br/ans/pt-br/assuntos/gestaosaude/parto-adequado-1',
  },
  {
    text: 'Brasil. Ministério da Saúde. Secretaria de Atenção Primária à Saúde. Departamento de Gestão do Cuidado Integral. Guia do Pré-Natal do Parceiro para Profissionais de Saúde [recurso eletrônico] / Ministério da Saúde Secretaria de Atenção Primária à Saúde. Departamento de Gestão do Cuidado Integral. – Brasília: Ministério da Saúde, 2023.',
    url: null,
  },
  {
    text: 'Brasil. Ministério da Saúde. Secretaria de Ciência, Tecnologia e Insumos Estratégicos. Departamento de Gestão e Incorporação de Tecnologias em Saúde. Diretrizes nacionais de assistência ao parto normal: versão resumida [recurso eletrônico] / Ministério da Saúde, Secretaria de Ciência, Tecnologia e Insumos Estratégicos, Departamento de Gestão e Incorporação de Tecnologias em Saúde. – Brasília : Ministério da Saúde, 2017.',
    url: null,
  },
  {
    text: 'BRASIL. Ministério da Saúde. Saúde materna. Brasília, DF: Ministério da Saúde. Disponível em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna.',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna',
  },
  {
    text: 'Brasil. Presidência da República. Casa Civil. Subchefia para Assuntos Jurídicos. Lei nº 11.108, de 7 de Abril de 2005. Altera a Lei nº 8.080, de 19 de setembro de 1990, para garantir às parturientes o direito à presença de acompanhante durante o trabalho de parto, parto e pós-parto imediato, no âmbito do Sistema Único de Saúde – SUS.',
    url: null,
  },
  {
    text: 'Cruz, Daniela Carvalho dos Santos, Sumam, Natália de Simoni, & Spíndola, Thelma. (2007). Os cuidados imediatos prestados ao recém-nascido e a promoção do vínculo mãe-bebê. Revista da Escola de Enfermagem da USP, 41(4), 690-697. https://dx.doi.org/10.1590/S0080-62342007000400021.',
    url: 'https://dx.doi.org/10.1590/S0080-62342007000400021',
  },
  {
    text: 'Iniciativa Hospital Amigo da Criança: revista, atualizada e ampliada para o cuidado integrado: modulo 3: promovendo e incentivando amamentação em um Hospital Amigo da Criança: curso de 20 horas para equipes de maternidade',
    url: null,
  },
  {
    text: 'FEBRASGO. Humanização no atendimento ao parto baseada em evidências. Femina, v. 45, n. 4, 2017. Disponível em: https://www.febrasgo.org.br/media/k2/attachments/67Z-ZFEMINA.pdf. Acesso em: 10 mar. 2026',
    url: 'https://www.febrasgo.org.br/media/k2/attachments/67Z-ZFEMINA.pdf',
  },
  {
    text: 'FEBRASGO. Recomendações FEBRASGO para temas controversos. 9 nov. 2018. Disponível em: https://www.febrasgo.org.br/pt/noticias/item/694-recomendacoes-febrasgo-para-temas-controversos. Acesso em: 10 mar. 2026.',
    url: 'https://www.febrasgo.org.br/pt/noticias/item/694-recomendacoes-febrasgo-para-temas-controversos',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: A Dor no Parto: significados e manejo. Rio de Janeiro, 2018. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/a-dor-no-parto-significados-e-manejo/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/a-dor-no-parto-significados-e-manejo/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Deixar de fazer Manobra de Kristeller: por que e como?. Rio de Janeiro, 2018. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/deixar-de-fazer-manobra-de-kristeller-por-que-e-como/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/deixar-de-fazer-manobra-de-kristeller-por-que-e-como/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Indução do Trabalho de Parto e Indicações de Cesárea. Rio de Janeiro, 2021. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/inducao-do-trabalho-de-parto-e-indicacoes-de-cesarea/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/inducao-do-trabalho-de-parto-e-indicacoes-de-cesarea/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Liberdade no Trabalho de Parto. Rio de Janeiro, 11 dez. 2023. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/liberdade-no-trabalho-de-parto/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/liberdade-no-trabalho-de-parto/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Principais Questões sobre Boas Práticas no 3º e 4º períodos do Trabalho de Parto. Rio de Janeiro, 2020. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-boas-praticas-no-3o-e-4o-periodos-do-trabalho-de-parto/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-boas-praticas-no-3o-e-4o-periodos-do-trabalho-de-parto/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Principais Questões sobre Dor no Trabalho de Parto: métodos de alívio não farmacológico. Rio de Janeiro, 2019. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-dor-no-trabalho-de-parto-e-parto-metodos-de-alivio-nao-farmacologico/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-dor-no-trabalho-de-parto-e-parto-metodos-de-alivio-nao-farmacologico/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Principais Questões sobre Segundo Período do Trabalho de Parto. Rio de Janeiro, 24 set. 2018. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-segundo-periodo-do-trabalho-de-parto/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-segundo-periodo-do-trabalho-de-parto/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Principais Questões sobre Posições para o Parto. Rio de Janeiro, 09 fev. 2023. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-posicoes-para-o-parto/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/principais-questoes-sobre-posicoes-para-o-parto/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Promoção do Aleitamento Materno no Alojamento Conjunto. Rio de Janeiro, 20 set. 2019. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/promocao-do-aleitamento-materno-no-alojamento-conjunto/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/promocao-do-aleitamento-materno-no-alojamento-conjunto/',
  },
  {
    text: 'FUNDAÇÃO OSWALDO CRUZ. Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Portal de Boas Práticas em Saúde da Mulher, da Criança e do Adolescente. Postagens: Violência Obstétrica: conceitos e evidências. Rio de Janeiro, 24 ago. 2023. Disponível em: <https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/violencia-obstetrica-conceitos-e-evidencias/>.',
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/violencia-obstetrica-conceitos-e-evidencias/',
  },
  {
    text: 'Vain, Néstor E.. (2015). Em tempo: como e quando deve ser feito o clampeamento do cordão umbilical: será que realmente importa?. Revista Paulista de Pediatria, 33(3), 258-259. https://dx.doi.org/10.1016/j.rpped.2015.06.001',
    url: 'https://dx.doi.org/10.1016/j.rpped.2015.06.001',
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
