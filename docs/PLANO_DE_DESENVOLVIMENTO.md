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
