/* global Prism */

Prism.languages.z80 = {
  comment: /;.*/,
  directive: {
    pattern: /\.\w+(?= )/,
    alias: 'keyword',
  },
  string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
  opcode: {
    pattern: /\b(?:adc|add|and|bit|ccf|cpl|daa|dec|in|inc|neg|or|res|rl|rla|rlc|rlca|rld|rr|rra|rrc|rrca|rrd|sbc|scf|set|sla|sra|srl|sub|xor|ldd|lddr|ldi|ldir|ldix|ldws|cp|cpd|cpdr|cpi|cpir|call|di|djnz|ei|halt|im|jp|jr|nop|ret|reti|retn|rst|ind|indr|ini|inir|otdr|otir|out|outd|outi|ex|exx|ld|pop|push|ADC|ADD|AND|BIT|CCF|CPL|DAA|DEC|IN|INC|NEG|OR|RES|RL|RLA|RLC|RLCA|RLD|RR|RRA|RRC|RRCA|RRD|SBC|SCF|SET|SLA|SRA|SRL|SUB|XOR|LDD|LDDR|LDI|LDIR|LDIX|LDWS|CP|CPD|CPDR|CPI|CPIR|CALL|DI|DJNZ|EI|HALT|IM|JP|JR|NOP|RET|RETI|RETN|RST|IND|INDR|INI|INIR|OTDR|OTIR|OUT|OUTD|OUTI|EX|EXX|LD|POP|PUSH|DEFB|defb|DB|db|DS|ds|DW|dw)\b/,
    alias: 'property',
  },
  hexnumber: {
    pattern: /#?\$[\da-f]{2,4}\b/i,
    alias: 'string',
  },
  binarynumber: {
    pattern: /#?%[01]+\b/,
    alias: 'string',
  },
  decimalnumber: {
    pattern: /#?\b\d+\b/,
    alias: 'string',
  },
  register: {
    pattern: /\b[xya]\b/i,
    alias: 'variable',
  },
};
