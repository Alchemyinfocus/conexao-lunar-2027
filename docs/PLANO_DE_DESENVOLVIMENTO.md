# Conexão Lunar 2027 — Plano de desenvolvimento

## Escopo aprovado
Sete telas: 00 Página Principal, 01 Calendário Lunar, 02 Fases da Lua, 03 Ingressos nos Signos, 04 Diário Lunar, 05 Planejamento Lunar e 06 Configurações e Impressão.

## Identidade visual
Referência obrigatória: imagens aprovadas pelo cliente. Paleta verde floresta, dourado champanhe e pergaminho; tipografia editorial; marca Alchemy in Focus. Não redesenhar as telas sem autorização.

## Estratégia técnica
Site estático HTML, CSS e JavaScript, concebido para distribuição offline. Sem dependências externas obrigatórias. Dados de diário e planejamento locais, com exportação/importação de backup. Interface em português e inglês. Impressão A4 e US Letter.

## Critérios de qualidade
- Dados astronômicos de 2027 somente após verificação de efemérides e tratamento explícito de UTC, fusos e horário de verão.
- Testar execução por file:// em navegadores de desktop e dispositivos móveis; persistência local pode variar conforme o navegador.
- Não incluir horários lunares fictícios na versão comercial.
- Verificar acessibilidade, responsividade, impressão e restauração de backup.
- O HTML distribuído é copiável: não prometer proteção anticópia.

## Etapas
1. Repositório privado e estrutura inicial.
2. Implementar a página principal com fidelidade ao visual aprovado.
3. Implementar navegação e as demais telas.
4. Integrar efemérides validadas.
5. Diário, planejamento, backup, impressão e PDF.
6. Traduções, testes e pacote de distribuição.

## Estado
Etapa 1 concluída; estrutura inicial em preparação. A implementação visual exige os arquivos originais das referências aprovadas.


## Auditoria astronômica — 2027 (registro técnico, 01/11/2026)

**Fases principais:** 49 registros de 2027 confrontados visualmente com a tabela oficial de fases do US Naval Observatory (UTC): https://aa.usno.navy.mil/calculated/moon/phases?year=2027 . Todos os horários da tabela `phaseRows` coincidem com a fonte publicada ao minuto. Status: **conferência de tabela concluída**; testes automatizados de regressão ainda pendentes.

**Ingressos tropicais:** 160 cruzamentos de longitude eclíptica geocêntrica da Lua com fronteiras múltiplas de 30 graus foram recalculados com PySwissEph 2.10.03 / Moshier / `calc_ut`, amostragem de seis horas e bisseção da raiz. Total de eventos compatível com `ingressRows`. Diferenças de arredondamento de até um minuto foram observadas em amostras de abril e dezembro; **não declarar a tabela validada** até comparar os 160 registros individualmente e com fonte ou efeméride independente.

**Limitações de interface:** a Lua ilustrada usa interpolação aproximada entre Luas Novas; não corresponde a cálculo fotométrico preciso. O signo exibido é calculado por data civil selecionada, não por hora selecionada, de modo que dias com ingresso podem mostrar o signo após o evento durante todo o dia. Não afirmar que a posição é válida para todas as horas do dia.

**Critérios de liberação:** (1) comparação automática dos 160 ingressos com tolerância definida; (2) auditoria independente; (3) testes de fuso incluindo mudança de data e horário de verão; (4) correção do signo exibido para instantes anteriores ao ingresso; (5) documentação de metodologia, arredondamento e licenças de bibliotecas; (6) testes de uso offline e backup/restauração.
