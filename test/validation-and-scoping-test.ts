import { describe, test } from 'vitest';
import { /*AstNode, LangiumDocument, ReferenceDescription,*/ AstNode, EmptyFileSystem, isLinkingError, LangiumDocument } from 'langium';
import { parseDocument } from 'langium/test';
import { createHelloWorld2Services } from '../src/language-server/hello-world-2-module';
//import { parse } from 'path';
//import { DescriptionContent } from '../src/language-server/generated/ast';
//import {expectNoErrors} from './test-utils';
import { Model } from '../src/language-server/generated/ast';

const services = createHelloWorld2Services(EmptyFileSystem).HelloWorld2;
//console.log(services)

describe('Test Scoping', () => {
    test('Find all references', async () => {
        await assertNoErrors(`
        person xxxx
        Hello yyyyy!
        `)
    });
   
});

async function assertNoErrors(modelText: string) {
    console.log("aaaa")
    var doc : LangiumDocument<AstNode> = await parseDocument(services, modelText)
    console.log("bbbbbb")
    //await services.shared.workspace.DocumentBuilder.build([doc]);
    const model = (doc.parseResult.value as Model);
    console.log("xxxx1 "+doc.diagnostics?.length)
    console.log("xxxx22 "+doc.references[0].error?.message)
    //expectNoErrors(doc)
}