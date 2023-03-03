import { describe, it } from 'vitest';
import { /*AstNode, LangiumDocument, ReferenceDescription,*/ AstNode, EmptyFileSystem, LangiumDocument } from 'langium';
import { parseDocument } from 'langium/test';
import { createHelloWorld2Services } from '../src/language-server/hello-world-2-module';
//import { parse } from 'path';
//import { DescriptionContent } from '../src/language-server/generated/ast';
//import {expectNoErrors} from './test-utils';
import { Model } from '../src/language-server/generated/ast';

const services = createHelloWorld2Services(EmptyFileSystem).HelloWorld2;
//console.log(services)

describe('Test Scoping', () => {
    it('parseIxnstrPRELU', () => {
        assertNoErrors(`
        person xxxx
        Hello yyyyy!
        `)
    });
   
});

async function assertNoErrors(modelText: string) {
    var doc : LangiumDocument<AstNode> = await parseDocument(services, modelText)
    await services.shared.workspace.DocumentBuilder.build([doc]);
    const model = (doc.parseResult.value as Model);
    console.log("xxxx1"+model)
    console.log("xxxx22"+doc.diagnostics)
    //expectNoErrors(doc)
}