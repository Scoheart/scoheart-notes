import {
  parse,
  compileTemplate,
  compileStyle,
  rewriteDefault,
  compileScript,
} from 'vue/compiler-sfc';
import path from 'path';
import fs from 'fs';

export default function vuePlugin() {
  return {
    name: 'vue-plugin',
    options(options) {
      console.log('-------- options ----------');
      // console.log('vue-plugin option', options);
    },
    resolveId(source, importer, options) {
      console.log('-------- resolveId start ----------');
      console.log('souce', source, importer, options);
      console.log('-------- resolveId end ----------');
    },
    async load(id) {
      console.log('-------- load start ----------');
      if (!id.endsWith('.vue')) {
        console.log('-------- other load end ----------');
        return null;
      }
      let codeList = [];
      const source = fs.readFileSync(id, 'utf-8');
      const { descriptor, errors } = parse(source);

      let __script;
      if (descriptor.script) {
        __script = compileScript(descriptor, {
          id: 'a',
        });
        __script = rewriteDefault(__script.content, '__sfc_main__');
      }

      let __template;
      if (descriptor.template) {
        __template = compileTemplate({
          source: descriptor.template.content,
          id: 'b',
        }).code;
      }

      codeList.push(__script);
      codeList.push(__template);
      codeList.push(`__sfc_main__.render=render`);
      codeList.push(`export default __sfc_main__`);
      const code = codeList.join('\n');
      console.log('-------- .vue load end ----------');
      return code;
    },
    buildEnd() {
      console.log('-----------buildEnd--------------');
    },
    transform(code, id) {
      console.log('-------- transform start ----------');
      console.log('--- code ', code);
      console.log('--- id', id);
      console.log('-------- transform end ----------\n');
    },
    generateBundle(options, bundle) {},
  };
}
