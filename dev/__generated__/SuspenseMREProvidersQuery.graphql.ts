/**
 * @generated SignedSource<<114cd6f9b97c23cd64822d08357a6ee5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SuspenseMREProvidersQuery$variables = Record<PropertyKey, never>;
export type SuspenseMREProvidersQuery$data = {
    readonly viewer: {
        readonly stackOneProviders: ReadonlyArray<{
            readonly integrationId: string | null | undefined;
            readonly key: string;
            readonly name: string;
            readonly version: string | null | undefined;
        }>;
    };
};
export type SuspenseMREProvidersQuery = {
    response: SuspenseMREProvidersQuery$data;
    variables: SuspenseMREProvidersQuery$variables;
};

const node: ConcreteRequest = (function () {
    var v0 = {
        alias: null,
        args: null,
        concreteType: 'Viewer',
        kind: 'LinkedField',
        name: 'viewer',
        plural: false,
        selections: [
            {
                alias: null,
                args: null,
                concreteType: 'StackOneProvider',
                kind: 'LinkedField',
                name: 'stackOneProviders',
                plural: true,
                selections: [
                    {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'key',
                        storageKey: null,
                    },
                    {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'name',
                        storageKey: null,
                    },
                    {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'version',
                        storageKey: null,
                    },
                    {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'integrationId',
                        storageKey: null,
                    },
                ],
                storageKey: null,
            },
        ],
        storageKey: null,
    };
    return {
        fragment: {
            argumentDefinitions: [],
            kind: 'Fragment',
            metadata: null,
            name: 'SuspenseMREProvidersQuery',
            selections: [
                {
                    kind: 'RequiredField',
                    field: v0 /*: any*/,
                    action: 'THROW',
                },
            ],
            type: 'Query',
            abstractKey: null,
        },
        kind: 'Request',
        operation: {
            argumentDefinitions: [],
            kind: 'Operation',
            name: 'SuspenseMREProvidersQuery',
            selections: [v0 /*: any*/],
        },
        params: {
            cacheID: '4c3a800c7dce93fb7a779bf3e6041bb4',
            id: null,
            metadata: {},
            name: 'SuspenseMREProvidersQuery',
            operationKind: 'query',
            text: 'query SuspenseMREProvidersQuery {\n  viewer {\n    stackOneProviders {\n      key\n      name\n      version\n      integrationId\n    }\n  }\n}\n',
        },
    };
})();

// biome-ignore lint/suspicious/noExplicitAny: relay-compiler generated
(node as any).hash = '59225c61b603440f197fbf0576b4eb3a';

export default node;
