import { mount } from 'svelte';
import Playground from './Playground.svelte';
import '../src/styles/core.css';
mount(Playground, { target: document.getElementById('app')! });
