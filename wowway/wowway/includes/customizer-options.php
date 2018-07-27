<?php
/**
 * This file contains the settings for the WordPress Theme Customizer (backend)
 */

function krown_customizer( $wp_customize ) {

	/* --- Google Fonts --- */
	////////////////////////

	$google_fonts_simple = array(
		serialize(array(
			'font-family' => "Arial, sans-serif;",
			'css-name' => 'Arial',
			'default' => true
		)) => 'Arial',
		serialize(array(
			'font-family' => "Cambria, Georgia, serif;",
			'css-name' => 'Cambria',
			'default' => true
		)) => 'Cambria',
		serialize(array(
			'font-family' => "Georgia, serif;",
			'css-name' => 'Georgia',
			'default' => true
		)) => 'Georgia',
		serialize(array(
			'font-family' => "Garamond, 'Hoefler Text', Times New Roman, Times, serif;",
			'css-name' => 'Garamond',
			'default' => true
		)) => 'Garamond',
		serialize(array(
			'font-family' => "'Helvetica Neue', Helvetica, Arial, sans-serif;",
			'css-name' => 'Helvetica Neue',
			'default' => true
		)) => 'Helvetica Neue',
		serialize(array(
			'font-family' => "Tahoma, Geneva, sans-serif;",
			'css-name' => 'Tahoma',
			'default' => true
		)) => 'Tahoma', 
		serialize(array(
			'font-family' => "'ABeeZee', sans-serif;",
			'css-name'=>'ABeeZee'
		)) => 'ABeeZee',
		serialize(array(
			'font-family' => "'Abel', sans-serif;",
			'css-name'=>'Abel'
		)) => 'Abel',
		serialize(array(
			'font-family' => "'Abril Fatface', display;",
			'css-name'=>'Abril+Fatface'
		)) => 'Abril Fatface',
		serialize(array(
			'font-family' => "'Aclonica', sans-serif;",
			'css-name'=>'Aclonica'
		)) => 'Aclonica',
		serialize(array(
			'font-family' => "'Acme', sans-serif;",
			'css-name'=>'Acme'
		)) => 'Acme',
		serialize(array(
			'font-family' => "'Actor', sans-serif;",
			'css-name'=>'Actor'
		)) => 'Actor',
		serialize(array(
			'font-family' => "'Adamina', serif;",
			'css-name'=>'Adamina'
		)) => 'Adamina',
		serialize(array(
			'font-family' => "'Advent Pro', sans-serif;",
			'css-name'=>'Advent+Pro'
		)) => 'Advent Pro',
		serialize(array(
			'font-family' => "'Aguafina Script', handwriting;",
			'css-name'=>'Aguafina+Script'
		)) => 'Aguafina Script',
		serialize(array(
			'font-family' => "'Akronim', display;",
			'css-name'=>'Akronim'
		)) => 'Akronim',
		serialize(array(
			'font-family' => "'Aladin', handwriting;",
			'css-name'=>'Aladin'
		)) => 'Aladin',
		serialize(array(
			'font-family' => "'Aldrich', sans-serif;",
			'css-name'=>'Aldrich'
		)) => 'Aldrich',
		serialize(array(
			'font-family' => "'Alef', sans-serif;",
			'css-name'=>'Alef'
		)) => 'Alef',
		serialize(array(
			'font-family' => "'Alegreya', serif;",
			'css-name'=>'Alegreya'
		)) => 'Alegreya',
		serialize(array(
			'font-family' => "'Alegreya SC', serif;",
			'css-name'=>'Alegreya+SC'
		)) => 'Alegreya SC',
		serialize(array(
			'font-family' => "'Alegreya Sans', sans-serif;",
			'css-name'=>'Alegreya+Sans'
		)) => 'Alegreya Sans',
		serialize(array(
			'font-family' => "'Alegreya Sans SC', sans-serif;",
			'css-name'=>'Alegreya+Sans+SC'
		)) => 'Alegreya Sans SC',
		serialize(array(
			'font-family' => "'Alex Brush', handwriting;",
			'css-name'=>'Alex+Brush'
		)) => 'Alex Brush',
		serialize(array(
			'font-family' => "'Alfa Slab One', display;",
			'css-name'=>'Alfa+Slab+One'
		)) => 'Alfa Slab One',
		serialize(array(
			'font-family' => "'Alice', serif;",
			'css-name'=>'Alice'
		)) => 'Alice',
		serialize(array(
			'font-family' => "'Alike', serif;",
			'css-name'=>'Alike'
		)) => 'Alike',
		serialize(array(
			'font-family' => "'Alike Angular', serif;",
			'css-name'=>'Alike+Angular'
		)) => 'Alike Angular',
		serialize(array(
			'font-family' => "'Allan', display;",
			'css-name'=>'Allan'
		)) => 'Allan',
		serialize(array(
			'font-family' => "'Allerta', sans-serif;",
			'css-name'=>'Allerta'
		)) => 'Allerta',
		serialize(array(
			'font-family' => "'Allerta Stencil', sans-serif;",
			'css-name'=>'Allerta+Stencil'
		)) => 'Allerta Stencil',
		serialize(array(
			'font-family' => "'Allura', handwriting;",
			'css-name'=>'Allura'
		)) => 'Allura',
		serialize(array(
			'font-family' => "'Almendra', serif;",
			'css-name'=>'Almendra'
		)) => 'Almendra',
		serialize(array(
			'font-family' => "'Almendra Display', display;",
			'css-name'=>'Almendra+Display'
		)) => 'Almendra Display',
		serialize(array(
			'font-family' => "'Almendra SC', serif;",
			'css-name'=>'Almendra+SC'
		)) => 'Almendra SC',
		serialize(array(
			'font-family' => "'Amarante', display;",
			'css-name'=>'Amarante'
		)) => 'Amarante',
		serialize(array(
			'font-family' => "'Amaranth', sans-serif;",
			'css-name'=>'Amaranth'
		)) => 'Amaranth',
		serialize(array(
			'font-family' => "'Amatic SC', handwriting;",
			'css-name'=>'Amatic+SC'
		)) => 'Amatic SC',
		serialize(array(
			'font-family' => "'Amethysta', serif;",
			'css-name'=>'Amethysta'
		)) => 'Amethysta',
		serialize(array(
			'font-family' => "'Anaheim', sans-serif;",
			'css-name'=>'Anaheim'
		)) => 'Anaheim',
		serialize(array(
			'font-family' => "'Andada', serif;",
			'css-name'=>'Andada'
		)) => 'Andada',
		serialize(array(
			'font-family' => "'Andika', sans-serif;",
			'css-name'=>'Andika'
		)) => 'Andika',
		serialize(array(
			'font-family' => "'Angkor', display;",
			'css-name'=>'Angkor'
		)) => 'Angkor',
		serialize(array(
			'font-family' => "'Annie Use Your Telescope', handwriting;",
			'css-name'=>'Annie+Use+Your+Telescope'
		)) => 'Annie Use Your Telescope',
		serialize(array(
			'font-family' => "'Anonymous Pro', monospace;",
			'css-name'=>'Anonymous+Pro'
		)) => 'Anonymous Pro',
		serialize(array(
			'font-family' => "'Antic', sans-serif;",
			'css-name'=>'Antic'
		)) => 'Antic',
		serialize(array(
			'font-family' => "'Antic Didone', serif;",
			'css-name'=>'Antic+Didone'
		)) => 'Antic Didone',
		serialize(array(
			'font-family' => "'Antic Slab', serif;",
			'css-name'=>'Antic+Slab'
		)) => 'Antic Slab',
		serialize(array(
			'font-family' => "'Anton', sans-serif;",
			'css-name'=>'Anton'
		)) => 'Anton',
		serialize(array(
			'font-family' => "'Arapey', serif;",
			'css-name'=>'Arapey'
		)) => 'Arapey',
		serialize(array(
			'font-family' => "'Arbutus', display;",
			'css-name'=>'Arbutus'
		)) => 'Arbutus',
		serialize(array(
			'font-family' => "'Arbutus Slab', serif;",
			'css-name'=>'Arbutus+Slab'
		)) => 'Arbutus Slab',
		serialize(array(
			'font-family' => "'Architects Daughter', handwriting;",
			'css-name'=>'Architects+Daughter'
		)) => 'Architects Daughter',
		serialize(array(
			'font-family' => "'Archivo Black', sans-serif;",
			'css-name'=>'Archivo+Black'
		)) => 'Archivo Black',
		serialize(array(
			'font-family' => "'Archivo Narrow', sans-serif;",
			'css-name'=>'Archivo+Narrow'
		)) => 'Archivo Narrow',
		serialize(array(
			'font-family' => "'Arimo', sans-serif;",
			'css-name'=>'Arimo'
		)) => 'Arimo',
		serialize(array(
			'font-family' => "'Arizonia', handwriting;",
			'css-name'=>'Arizonia'
		)) => 'Arizonia',
		serialize(array(
			'font-family' => "'Armata', sans-serif;",
			'css-name'=>'Armata'
		)) => 'Armata',
		serialize(array(
			'font-family' => "'Artifika', serif;",
			'css-name'=>'Artifika'
		)) => 'Artifika',
		serialize(array(
			'font-family' => "'Arvo', serif;",
			'css-name'=>'Arvo'
		)) => 'Arvo',
		serialize(array(
			'font-family' => "'Asap', sans-serif;",
			'css-name'=>'Asap'
		)) => 'Asap',
		serialize(array(
			'font-family' => "'Asset', display;",
			'css-name'=>'Asset'
		)) => 'Asset',
		serialize(array(
			'font-family' => "'Astloch', display;",
			'css-name'=>'Astloch'
		)) => 'Astloch',
		serialize(array(
			'font-family' => "'Asul', sans-serif;",
			'css-name'=>'Asul'
		)) => 'Asul',
		serialize(array(
			'font-family' => "'Atomic Age', display;",
			'css-name'=>'Atomic+Age'
		)) => 'Atomic Age',
		serialize(array(
			'font-family' => "'Aubrey', display;",
			'css-name'=>'Aubrey'
		)) => 'Aubrey',
		serialize(array(
			'font-family' => "'Audiowide', display;",
			'css-name'=>'Audiowide'
		)) => 'Audiowide',
		serialize(array(
			'font-family' => "'Autour One', display;",
			'css-name'=>'Autour+One'
		)) => 'Autour One',
		serialize(array(
			'font-family' => "'Average', serif;",
			'css-name'=>'Average'
		)) => 'Average',
		serialize(array(
			'font-family' => "'Average Sans', sans-serif;",
			'css-name'=>'Average+Sans'
		)) => 'Average Sans',
		serialize(array(
			'font-family' => "'Averia Gruesa Libre', display;",
			'css-name'=>'Averia+Gruesa+Libre'
		)) => 'Averia Gruesa Libre',
		serialize(array(
			'font-family' => "'Averia Libre', display;",
			'css-name'=>'Averia+Libre'
		)) => 'Averia Libre',
		serialize(array(
			'font-family' => "'Averia Sans Libre', display;",
			'css-name'=>'Averia+Sans+Libre'
		)) => 'Averia Sans Libre',
		serialize(array(
			'font-family' => "'Averia Serif Libre', display;",
			'css-name'=>'Averia+Serif+Libre'
		)) => 'Averia Serif Libre',
		serialize(array(
			'font-family' => "'Bad Script', handwriting;",
			'css-name'=>'Bad+Script'
		)) => 'Bad Script',
		serialize(array(
			'font-family' => "'Balthazar', serif;",
			'css-name'=>'Balthazar'
		)) => 'Balthazar',
		serialize(array(
			'font-family' => "'Bangers', display;",
			'css-name'=>'Bangers'
		)) => 'Bangers',
		serialize(array(
			'font-family' => "'Basic', sans-serif;",
			'css-name'=>'Basic'
		)) => 'Basic',
		serialize(array(
			'font-family' => "'Battambang', display;",
			'css-name'=>'Battambang'
		)) => 'Battambang',
		serialize(array(
			'font-family' => "'Baumans', display;",
			'css-name'=>'Baumans'
		)) => 'Baumans',
		serialize(array(
			'font-family' => "'Bayon', display;",
			'css-name'=>'Bayon'
		)) => 'Bayon',
		serialize(array(
			'font-family' => "'Belgrano', serif;",
			'css-name'=>'Belgrano'
		)) => 'Belgrano',
		serialize(array(
			'font-family' => "'Belleza', sans-serif;",
			'css-name'=>'Belleza'
		)) => 'Belleza',
		serialize(array(
			'font-family' => "'BenchNine', sans-serif;",
			'css-name'=>'BenchNine'
		)) => 'BenchNine',
		serialize(array(
			'font-family' => "'Bentham', serif;",
			'css-name'=>'Bentham'
		)) => 'Bentham',
		serialize(array(
			'font-family' => "'Berkshire Swash', handwriting;",
			'css-name'=>'Berkshire+Swash'
		)) => 'Berkshire Swash',
		serialize(array(
			'font-family' => "'Bevan', display;",
			'css-name'=>'Bevan'
		)) => 'Bevan',
		serialize(array(
			'font-family' => "'Bigelow Rules', display;",
			'css-name'=>'Bigelow+Rules'
		)) => 'Bigelow Rules',
		serialize(array(
			'font-family' => "'Bigshot One', display;",
			'css-name'=>'Bigshot+One'
		)) => 'Bigshot One',
		serialize(array(
			'font-family' => "'Bilbo', handwriting;",
			'css-name'=>'Bilbo'
		)) => 'Bilbo',
		serialize(array(
			'font-family' => "'Bilbo Swash Caps', handwriting;",
			'css-name'=>'Bilbo+Swash+Caps'
		)) => 'Bilbo Swash Caps',
		serialize(array(
			'font-family' => "'Bitter', serif;",
			'css-name'=>'Bitter'
		)) => 'Bitter',
		serialize(array(
			'font-family' => "'Black Ops One', display;",
			'css-name'=>'Black+Ops+One'
		)) => 'Black Ops One',
		serialize(array(
			'font-family' => "'Bokor', display;",
			'css-name'=>'Bokor'
		)) => 'Bokor',
		serialize(array(
			'font-family' => "'Bonbon', handwriting;",
			'css-name'=>'Bonbon'
		)) => 'Bonbon',
		serialize(array(
			'font-family' => "'Boogaloo', display;",
			'css-name'=>'Boogaloo'
		)) => 'Boogaloo',
		serialize(array(
			'font-family' => "'Bowlby One', display;",
			'css-name'=>'Bowlby+One'
		)) => 'Bowlby One',
		serialize(array(
			'font-family' => "'Bowlby One SC', display;",
			'css-name'=>'Bowlby+One+SC'
		)) => 'Bowlby One SC',
		serialize(array(
			'font-family' => "'Brawler', serif;",
			'css-name'=>'Brawler'
		)) => 'Brawler',
		serialize(array(
			'font-family' => "'Bree Serif', serif;",
			'css-name'=>'Bree+Serif'
		)) => 'Bree Serif',
		serialize(array(
			'font-family' => "'Bubblegum Sans', display;",
			'css-name'=>'Bubblegum+Sans'
		)) => 'Bubblegum Sans',
		serialize(array(
			'font-family' => "'Bubbler One', sans-serif;",
			'css-name'=>'Bubbler+One'
		)) => 'Bubbler One',
		serialize(array(
			'font-family' => "'Buda', display;",
			'css-name'=>'Buda'
		)) => 'Buda',
		serialize(array(
			'font-family' => "'Buenard', serif;",
			'css-name'=>'Buenard'
		)) => 'Buenard',
		serialize(array(
			'font-family' => "'Butcherman', display;",
			'css-name'=>'Butcherman'
		)) => 'Butcherman',
		serialize(array(
			'font-family' => "'Butterfly Kids', handwriting;",
			'css-name'=>'Butterfly+Kids'
		)) => 'Butterfly Kids',
		serialize(array(
			'font-family' => "'Cabin', sans-serif;",
			'css-name'=>'Cabin'
		)) => 'Cabin',
		serialize(array(
			'font-family' => "'Cabin Condensed', sans-serif;",
			'css-name'=>'Cabin+Condensed'
		)) => 'Cabin Condensed',
		serialize(array(
			'font-family' => "'Cabin Sketch', display;",
			'css-name'=>'Cabin+Sketch'
		)) => 'Cabin Sketch',
		serialize(array(
			'font-family' => "'Caesar Dressing', display;",
			'css-name'=>'Caesar+Dressing'
		)) => 'Caesar Dressing',
		serialize(array(
			'font-family' => "'Cagliostro', sans-serif;",
			'css-name'=>'Cagliostro'
		)) => 'Cagliostro',
		serialize(array(
			'font-family' => "'Calligraffitti', handwriting;",
			'css-name'=>'Calligraffitti'
		)) => 'Calligraffitti',
		serialize(array(
			'font-family' => "'Cambo', serif;",
			'css-name'=>'Cambo'
		)) => 'Cambo',
		serialize(array(
			'font-family' => "'Candal', sans-serif;",
			'css-name'=>'Candal'
		)) => 'Candal',
		serialize(array(
			'font-family' => "'Cantarell', sans-serif;",
			'css-name'=>'Cantarell'
		)) => 'Cantarell',
		serialize(array(
			'font-family' => "'Cantata One', serif;",
			'css-name'=>'Cantata+One'
		)) => 'Cantata One',
		serialize(array(
			'font-family' => "'Cantora One', sans-serif;",
			'css-name'=>'Cantora+One'
		)) => 'Cantora One',
		serialize(array(
			'font-family' => "'Capriola', sans-serif;",
			'css-name'=>'Capriola'
		)) => 'Capriola',
		serialize(array(
			'font-family' => "'Cardo', serif;",
			'css-name'=>'Cardo'
		)) => 'Cardo',
		serialize(array(
			'font-family' => "'Carme', sans-serif;",
			'css-name'=>'Carme'
		)) => 'Carme',
		serialize(array(
			'font-family' => "'Carrois Gothic', sans-serif;",
			'css-name'=>'Carrois+Gothic'
		)) => 'Carrois Gothic',
		serialize(array(
			'font-family' => "'Carrois Gothic SC', sans-serif;",
			'css-name'=>'Carrois+Gothic+SC'
		)) => 'Carrois Gothic SC',
		serialize(array(
			'font-family' => "'Carter One', display;",
			'css-name'=>'Carter+One'
		)) => 'Carter One',
		serialize(array(
			'font-family' => "'Caudex', serif;",
			'css-name'=>'Caudex'
		)) => 'Caudex',
		serialize(array(
			'font-family' => "'Cedarville Cursive', handwriting;",
			'css-name'=>'Cedarville+Cursive'
		)) => 'Cedarville Cursive',
		serialize(array(
			'font-family' => "'Ceviche One', display;",
			'css-name'=>'Ceviche+One'
		)) => 'Ceviche One',
		serialize(array(
			'font-family' => "'Changa One', display;",
			'css-name'=>'Changa+One'
		)) => 'Changa One',
		serialize(array(
			'font-family' => "'Chango', display;",
			'css-name'=>'Chango'
		)) => 'Chango',
		serialize(array(
			'font-family' => "'Chau Philomene One', sans-serif;",
			'css-name'=>'Chau+Philomene+One'
		)) => 'Chau Philomene One',
		serialize(array(
			'font-family' => "'Chela One', display;",
			'css-name'=>'Chela+One'
		)) => 'Chela One',
		serialize(array(
			'font-family' => "'Chelsea Market', display;",
			'css-name'=>'Chelsea+Market'
		)) => 'Chelsea Market',
		serialize(array(
			'font-family' => "'Chenla', display;",
			'css-name'=>'Chenla'
		)) => 'Chenla',
		serialize(array(
			'font-family' => "'Cherry Cream Soda', display;",
			'css-name'=>'Cherry+Cream+Soda'
		)) => 'Cherry Cream Soda',
		serialize(array(
			'font-family' => "'Cherry Swash', display;",
			'css-name'=>'Cherry+Swash'
		)) => 'Cherry Swash',
		serialize(array(
			'font-family' => "'Chewy', display;",
			'css-name'=>'Chewy'
		)) => 'Chewy',
		serialize(array(
			'font-family' => "'Chicle', display;",
			'css-name'=>'Chicle'
		)) => 'Chicle',
		serialize(array(
			'font-family' => "'Chivo', sans-serif;",
			'css-name'=>'Chivo'
		)) => 'Chivo',
		serialize(array(
			'font-family' => "'Cinzel', serif;",
			'css-name'=>'Cinzel'
		)) => 'Cinzel',
		serialize(array(
			'font-family' => "'Cinzel Decorative', display;",
			'css-name'=>'Cinzel+Decorative'
		)) => 'Cinzel Decorative',
		serialize(array(
			'font-family' => "'Clicker Script', handwriting;",
			'css-name'=>'Clicker+Script'
		)) => 'Clicker Script',
		serialize(array(
			'font-family' => "'Coda', display;",
			'css-name'=>'Coda'
		)) => 'Coda',
		serialize(array(
			'font-family' => "'Coda Caption', sans-serif;",
			'css-name'=>'Coda+Caption'
		)) => 'Coda Caption',
		serialize(array(
			'font-family' => "'Codystar', display;",
			'css-name'=>'Codystar'
		)) => 'Codystar',
		serialize(array(
			'font-family' => "'Combo', display;",
			'css-name'=>'Combo'
		)) => 'Combo',
		serialize(array(
			'font-family' => "'Comfortaa', display;",
			'css-name'=>'Comfortaa'
		)) => 'Comfortaa',
		serialize(array(
			'font-family' => "'Coming Soon', handwriting;",
			'css-name'=>'Coming+Soon'
		)) => 'Coming Soon',
		serialize(array(
			'font-family' => "'Concert One', display;",
			'css-name'=>'Concert+One'
		)) => 'Concert One',
		serialize(array(
			'font-family' => "'Condiment', handwriting;",
			'css-name'=>'Condiment'
		)) => 'Condiment',
		serialize(array(
			'font-family' => "'Content', display;",
			'css-name'=>'Content'
		)) => 'Content',
		serialize(array(
			'font-family' => "'Contrail One', display;",
			'css-name'=>'Contrail+One'
		)) => 'Contrail One',
		serialize(array(
			'font-family' => "'Convergence', sans-serif;",
			'css-name'=>'Convergence'
		)) => 'Convergence',
		serialize(array(
			'font-family' => "'Cookie', handwriting;",
			'css-name'=>'Cookie'
		)) => 'Cookie',
		serialize(array(
			'font-family' => "'Copse', serif;",
			'css-name'=>'Copse'
		)) => 'Copse',
		serialize(array(
			'font-family' => "'Corben', display;",
			'css-name'=>'Corben'
		)) => 'Corben',
		serialize(array(
			'font-family' => "'Courgette', handwriting;",
			'css-name'=>'Courgette'
		)) => 'Courgette',
		serialize(array(
			'font-family' => "'Cousine', monospace;",
			'css-name'=>'Cousine'
		)) => 'Cousine',
		serialize(array(
			'font-family' => "'Coustard', serif;",
			'css-name'=>'Coustard'
		)) => 'Coustard',
		serialize(array(
			'font-family' => "'Covered By Your Grace', handwriting;",
			'css-name'=>'Covered+By+Your+Grace'
		)) => 'Covered By Your Grace',
		serialize(array(
			'font-family' => "'Crafty Girls', handwriting;",
			'css-name'=>'Crafty+Girls'
		)) => 'Crafty Girls',
		serialize(array(
			'font-family' => "'Creepster', display;",
			'css-name'=>'Creepster'
		)) => 'Creepster',
		serialize(array(
			'font-family' => "'Crete Round', serif;",
			'css-name'=>'Crete+Round'
		)) => 'Crete Round',
		serialize(array(
			'font-family' => "'Crimson Text', serif;",
			'css-name'=>'Crimson+Text'
		)) => 'Crimson Text',
		serialize(array(
			'font-family' => "'Croissant One', display;",
			'css-name'=>'Croissant+One'
		)) => 'Croissant One',
		serialize(array(
			'font-family' => "'Crushed', display;",
			'css-name'=>'Crushed'
		)) => 'Crushed',
		serialize(array(
			'font-family' => "'Cuprum', sans-serif;",
			'css-name'=>'Cuprum'
		)) => 'Cuprum',
		serialize(array(
			'font-family' => "'Cutive', serif;",
			'css-name'=>'Cutive'
		)) => 'Cutive',
		serialize(array(
			'font-family' => "'Cutive Mono', monospace;",
			'css-name'=>'Cutive+Mono'
		)) => 'Cutive Mono',
		serialize(array(
			'font-family' => "'Damion', handwriting;",
			'css-name'=>'Damion'
		)) => 'Damion',
		serialize(array(
			'font-family' => "'Dancing Script', handwriting;",
			'css-name'=>'Dancing+Script'
		)) => 'Dancing Script',
		serialize(array(
			'font-family' => "'Dangrek', display;",
			'css-name'=>'Dangrek'
		)) => 'Dangrek',
		serialize(array(
			'font-family' => "'Dawning of a New Day', handwriting;",
			'css-name'=>'Dawning+of+a+New+Day'
		)) => 'Dawning of a New Day',
		serialize(array(
			'font-family' => "'Days One', sans-serif;",
			'css-name'=>'Days+One'
		)) => 'Days One',
		serialize(array(
			'font-family' => "'Delius', handwriting;",
			'css-name'=>'Delius'
		)) => 'Delius',
		serialize(array(
			'font-family' => "'Delius Swash Caps', handwriting;",
			'css-name'=>'Delius+Swash+Caps'
		)) => 'Delius Swash Caps',
		serialize(array(
			'font-family' => "'Delius Unicase', handwriting;",
			'css-name'=>'Delius+Unicase'
		)) => 'Delius Unicase',
		serialize(array(
			'font-family' => "'Della Respira', serif;",
			'css-name'=>'Della+Respira'
		)) => 'Della Respira',
		serialize(array(
			'font-family' => "'Denk One', sans-serif;",
			'css-name'=>'Denk+One'
		)) => 'Denk One',
		serialize(array(
			'font-family' => "'Devonshire', handwriting;",
			'css-name'=>'Devonshire'
		)) => 'Devonshire',
		serialize(array(
			'font-family' => "'Didact Gothic', sans-serif;",
			'css-name'=>'Didact+Gothic'
		)) => 'Didact Gothic',
		serialize(array(
			'font-family' => "'Diplomata', display;",
			'css-name'=>'Diplomata'
		)) => 'Diplomata',
		serialize(array(
			'font-family' => "'Diplomata SC', display;",
			'css-name'=>'Diplomata+SC'
		)) => 'Diplomata SC',
		serialize(array(
			'font-family' => "'Domine', serif;",
			'css-name'=>'Domine'
		)) => 'Domine',
		serialize(array(
			'font-family' => "'Donegal One', serif;",
			'css-name'=>'Donegal+One'
		)) => 'Donegal One',
		serialize(array(
			'font-family' => "'Doppio One', sans-serif;",
			'css-name'=>'Doppio+One'
		)) => 'Doppio One',
		serialize(array(
			'font-family' => "'Dorsa', sans-serif;",
			'css-name'=>'Dorsa'
		)) => 'Dorsa',
		serialize(array(
			'font-family' => "'Dosis', sans-serif;",
			'css-name'=>'Dosis'
		)) => 'Dosis',
		serialize(array(
			'font-family' => "'Dr Sugiyama', handwriting;",
			'css-name'=>'Dr+Sugiyama'
		)) => 'Dr Sugiyama',
		serialize(array(
			'font-family' => "'Droid Sans', sans-serif;",
			'css-name'=>'Droid+Sans'
		)) => 'Droid Sans',
		serialize(array(
			'font-family' => "'Droid Sans Mono', monospace;",
			'css-name'=>'Droid+Sans+Mono'
		)) => 'Droid Sans Mono',
		serialize(array(
			'font-family' => "'Droid Serif', serif;",
			'css-name'=>'Droid+Serif'
		)) => 'Droid Serif',
		serialize(array(
			'font-family' => "'Duru Sans', sans-serif;",
			'css-name'=>'Duru+Sans'
		)) => 'Duru Sans',
		serialize(array(
			'font-family' => "'Dynalight', display;",
			'css-name'=>'Dynalight'
		)) => 'Dynalight',
		serialize(array(
			'font-family' => "'EB Garamond', serif;",
			'css-name'=>'EB+Garamond'
		)) => 'EB Garamond',
		serialize(array(
			'font-family' => "'Eagle Lake', handwriting;",
			'css-name'=>'Eagle+Lake'
		)) => 'Eagle Lake',
		serialize(array(
			'font-family' => "'Eater', display;",
			'css-name'=>'Eater'
		)) => 'Eater',
		serialize(array(
			'font-family' => "'Economica', sans-serif;",
			'css-name'=>'Economica'
		)) => 'Economica',
		serialize(array(
			'font-family' => "'Ek Mukta', sans-serif;",
			'css-name'=>'Ek+Mukta'
		)) => 'Ek Mukta',
		serialize(array(
			'font-family' => "'Electrolize', sans-serif;",
			'css-name'=>'Electrolize'
		)) => 'Electrolize',
		serialize(array(
			'font-family' => "'Elsie', display;",
			'css-name'=>'Elsie'
		)) => 'Elsie',
		serialize(array(
			'font-family' => "'Elsie Swash Caps', display;",
			'css-name'=>'Elsie+Swash+Caps'
		)) => 'Elsie Swash Caps',
		serialize(array(
			'font-family' => "'Emblema One', display;",
			'css-name'=>'Emblema+One'
		)) => 'Emblema One',
		serialize(array(
			'font-family' => "'Emilys Candy', display;",
			'css-name'=>'Emilys+Candy'
		)) => 'Emilys Candy',
		serialize(array(
			'font-family' => "'Engagement', handwriting;",
			'css-name'=>'Engagement'
		)) => 'Engagement',
		serialize(array(
			'font-family' => "'Englebert', sans-serif;",
			'css-name'=>'Englebert'
		)) => 'Englebert',
		serialize(array(
			'font-family' => "'Enriqueta', serif;",
			'css-name'=>'Enriqueta'
		)) => 'Enriqueta',
		serialize(array(
			'font-family' => "'Erica One', display;",
			'css-name'=>'Erica+One'
		)) => 'Erica One',
		serialize(array(
			'font-family' => "'Esteban', serif;",
			'css-name'=>'Esteban'
		)) => 'Esteban',
		serialize(array(
			'font-family' => "'Euphoria Script', handwriting;",
			'css-name'=>'Euphoria+Script'
		)) => 'Euphoria Script',
		serialize(array(
			'font-family' => "'Ewert', display;",
			'css-name'=>'Ewert'
		)) => 'Ewert',
		serialize(array(
			'font-family' => "'Exo', sans-serif;",
			'css-name'=>'Exo'
		)) => 'Exo',
		serialize(array(
			'font-family' => "'Exo 2', sans-serif;",
			'css-name'=>'Exo+2'
		)) => 'Exo 2',
		serialize(array(
			'font-family' => "'Expletus Sans', display;",
			'css-name'=>'Expletus+Sans'
		)) => 'Expletus Sans',
		serialize(array(
			'font-family' => "'Fanwood Text', serif;",
			'css-name'=>'Fanwood+Text'
		)) => 'Fanwood Text',
		serialize(array(
			'font-family' => "'Fascinate', display;",
			'css-name'=>'Fascinate'
		)) => 'Fascinate',
		serialize(array(
			'font-family' => "'Fascinate Inline', display;",
			'css-name'=>'Fascinate+Inline'
		)) => 'Fascinate Inline',
		serialize(array(
			'font-family' => "'Faster One', display;",
			'css-name'=>'Faster+One'
		)) => 'Faster One',
		serialize(array(
			'font-family' => "'Fasthand', serif;",
			'css-name'=>'Fasthand'
		)) => 'Fasthand',
		serialize(array(
			'font-family' => "'Fauna One', serif;",
			'css-name'=>'Fauna+One'
		)) => 'Fauna One',
		serialize(array(
			'font-family' => "'Federant', display;",
			'css-name'=>'Federant'
		)) => 'Federant',
		serialize(array(
			'font-family' => "'Federo', sans-serif;",
			'css-name'=>'Federo'
		)) => 'Federo',
		serialize(array(
			'font-family' => "'Felipa', handwriting;",
			'css-name'=>'Felipa'
		)) => 'Felipa',
		serialize(array(
			'font-family' => "'Fenix', serif;",
			'css-name'=>'Fenix'
		)) => 'Fenix',
		serialize(array(
			'font-family' => "'Finger Paint', display;",
			'css-name'=>'Finger+Paint'
		)) => 'Finger Paint',
		serialize(array(
			'font-family' => "'Fira Mono', monospace;",
			'css-name'=>'Fira+Mono'
		)) => 'Fira Mono',
		serialize(array(
			'font-family' => "'Fira Sans', sans-serif;",
			'css-name'=>'Fira+Sans'
		)) => 'Fira Sans',
		serialize(array(
			'font-family' => "'Fjalla One', sans-serif;",
			'css-name'=>'Fjalla+One'
		)) => 'Fjalla One',
		serialize(array(
			'font-family' => "'Fjord One', serif;",
			'css-name'=>'Fjord+One'
		)) => 'Fjord One',
		serialize(array(
			'font-family' => "'Flamenco', display;",
			'css-name'=>'Flamenco'
		)) => 'Flamenco',
		serialize(array(
			'font-family' => "'Flavors', display;",
			'css-name'=>'Flavors'
		)) => 'Flavors',
		serialize(array(
			'font-family' => "'Fondamento', handwriting;",
			'css-name'=>'Fondamento'
		)) => 'Fondamento',
		serialize(array(
			'font-family' => "'Fontdiner Swanky', display;",
			'css-name'=>'Fontdiner+Swanky'
		)) => 'Fontdiner Swanky',
		serialize(array(
			'font-family' => "'Forum', display;",
			'css-name'=>'Forum'
		)) => 'Forum',
		serialize(array(
			'font-family' => "'Francois One', sans-serif;",
			'css-name'=>'Francois+One'
		)) => 'Francois One',
		serialize(array(
			'font-family' => "'Freckle Face', display;",
			'css-name'=>'Freckle+Face'
		)) => 'Freckle Face',
		serialize(array(
			'font-family' => "'Fredericka the Great', display;",
			'css-name'=>'Fredericka+the+Great'
		)) => 'Fredericka the Great',
		serialize(array(
			'font-family' => "'Fredoka One', display;",
			'css-name'=>'Fredoka+One'
		)) => 'Fredoka One',
		serialize(array(
			'font-family' => "'Freehand', display;",
			'css-name'=>'Freehand'
		)) => 'Freehand',
		serialize(array(
			'font-family' => "'Fresca', sans-serif;",
			'css-name'=>'Fresca'
		)) => 'Fresca',
		serialize(array(
			'font-family' => "'Frijole', display;",
			'css-name'=>'Frijole'
		)) => 'Frijole',
		serialize(array(
			'font-family' => "'Fruktur', display;",
			'css-name'=>'Fruktur'
		)) => 'Fruktur',
		serialize(array(
			'font-family' => "'Fugaz One', display;",
			'css-name'=>'Fugaz+One'
		)) => 'Fugaz One',
		serialize(array(
			'font-family' => "'GFS Didot', serif;",
			'css-name'=>'GFS+Didot'
		)) => 'GFS Didot',
		serialize(array(
			'font-family' => "'GFS Neohellenic', sans-serif;",
			'css-name'=>'GFS+Neohellenic'
		)) => 'GFS Neohellenic',
		serialize(array(
			'font-family' => "'Gabriela', serif;",
			'css-name'=>'Gabriela'
		)) => 'Gabriela',
		serialize(array(
			'font-family' => "'Gafata', sans-serif;",
			'css-name'=>'Gafata'
		)) => 'Gafata',
		serialize(array(
			'font-family' => "'Galdeano', sans-serif;",
			'css-name'=>'Galdeano'
		)) => 'Galdeano',
		serialize(array(
			'font-family' => "'Galindo', display;",
			'css-name'=>'Galindo'
		)) => 'Galindo',
		serialize(array(
			'font-family' => "'Gentium Basic', serif;",
			'css-name'=>'Gentium+Basic'
		)) => 'Gentium Basic',
		serialize(array(
			'font-family' => "'Gentium Book Basic', serif;",
			'css-name'=>'Gentium+Book+Basic'
		)) => 'Gentium Book Basic',
		serialize(array(
			'font-family' => "'Geo', sans-serif;",
			'css-name'=>'Geo'
		)) => 'Geo',
		serialize(array(
			'font-family' => "'Geostar', display;",
			'css-name'=>'Geostar'
		)) => 'Geostar',
		serialize(array(
			'font-family' => "'Geostar Fill', display;",
			'css-name'=>'Geostar+Fill'
		)) => 'Geostar Fill',
		serialize(array(
			'font-family' => "'Germania One', display;",
			'css-name'=>'Germania+One'
		)) => 'Germania One',
		serialize(array(
			'font-family' => "'Gilda Display', serif;",
			'css-name'=>'Gilda+Display'
		)) => 'Gilda Display',
		serialize(array(
			'font-family' => "'Give You Glory', handwriting;",
			'css-name'=>'Give+You+Glory'
		)) => 'Give You Glory',
		serialize(array(
			'font-family' => "'Glass Antiqua', display;",
			'css-name'=>'Glass+Antiqua'
		)) => 'Glass Antiqua',
		serialize(array(
			'font-family' => "'Glegoo', serif;",
			'css-name'=>'Glegoo'
		)) => 'Glegoo',
		serialize(array(
			'font-family' => "'Gloria Hallelujah', handwriting;",
			'css-name'=>'Gloria+Hallelujah'
		)) => 'Gloria Hallelujah',
		serialize(array(
			'font-family' => "'Goblin One', display;",
			'css-name'=>'Goblin+One'
		)) => 'Goblin One',
		serialize(array(
			'font-family' => "'Gochi Hand', handwriting;",
			'css-name'=>'Gochi+Hand'
		)) => 'Gochi Hand',
		serialize(array(
			'font-family' => "'Gorditas', display;",
			'css-name'=>'Gorditas'
		)) => 'Gorditas',
		serialize(array(
			'font-family' => "'Goudy Bookletter 1911', serif;",
			'css-name'=>'Goudy+Bookletter+1911'
		)) => 'Goudy Bookletter 1911',
		serialize(array(
			'font-family' => "'Graduate', display;",
			'css-name'=>'Graduate'
		)) => 'Graduate',
		serialize(array(
			'font-family' => "'Grand Hotel', handwriting;",
			'css-name'=>'Grand+Hotel'
		)) => 'Grand Hotel',
		serialize(array(
			'font-family' => "'Gravitas One', display;",
			'css-name'=>'Gravitas+One'
		)) => 'Gravitas One',
		serialize(array(
			'font-family' => "'Great Vibes', handwriting;",
			'css-name'=>'Great+Vibes'
		)) => 'Great Vibes',
		serialize(array(
			'font-family' => "'Griffy', display;",
			'css-name'=>'Griffy'
		)) => 'Griffy',
		serialize(array(
			'font-family' => "'Gruppo', display;",
			'css-name'=>'Gruppo'
		)) => 'Gruppo',
		serialize(array(
			'font-family' => "'Gudea', sans-serif;",
			'css-name'=>'Gudea'
		)) => 'Gudea',
		serialize(array(
			'font-family' => "'Habibi', serif;",
			'css-name'=>'Habibi'
		)) => 'Habibi',
		serialize(array(
			'font-family' => "'Hammersmith One', sans-serif;",
			'css-name'=>'Hammersmith+One'
		)) => 'Hammersmith One',
		serialize(array(
			'font-family' => "'Hanalei', display;",
			'css-name'=>'Hanalei'
		)) => 'Hanalei',
		serialize(array(
			'font-family' => "'Hanalei Fill', display;",
			'css-name'=>'Hanalei+Fill'
		)) => 'Hanalei Fill',
		serialize(array(
			'font-family' => "'Handlee', handwriting;",
			'css-name'=>'Handlee'
		)) => 'Handlee',
		serialize(array(
			'font-family' => "'Hanuman', serif;",
			'css-name'=>'Hanuman'
		)) => 'Hanuman',
		serialize(array(
			'font-family' => "'Happy Monkey', display;",
			'css-name'=>'Happy+Monkey'
		)) => 'Happy Monkey',
		serialize(array(
			'font-family' => "'Headland One', serif;",
			'css-name'=>'Headland+One'
		)) => 'Headland One',
		serialize(array(
			'font-family' => "'Henny Penny', display;",
			'css-name'=>'Henny+Penny'
		)) => 'Henny Penny',
		serialize(array(
			'font-family' => "'Herr Von Muellerhoff', handwriting;",
			'css-name'=>'Herr+Von+Muellerhoff'
		)) => 'Herr Von Muellerhoff',
		serialize(array(
			'font-family' => "'Holtwood One SC', serif;",
			'css-name'=>'Holtwood+One+SC'
		)) => 'Holtwood One SC',
		serialize(array(
			'font-family' => "'Homemade Apple', handwriting;",
			'css-name'=>'Homemade+Apple'
		)) => 'Homemade Apple',
		serialize(array(
			'font-family' => "'Homenaje', sans-serif;",
			'css-name'=>'Homenaje'
		)) => 'Homenaje',
		serialize(array(
			'font-family' => "'IM Fell DW Pica', serif;",
			'css-name'=>'IM+Fell+DW+Pica'
		)) => 'IM Fell DW Pica',
		serialize(array(
			'font-family' => "'IM Fell DW Pica SC', serif;",
			'css-name'=>'IM+Fell+DW+Pica+SC'
		)) => 'IM Fell DW Pica SC',
		serialize(array(
			'font-family' => "'IM Fell Double Pica', serif;",
			'css-name'=>'IM+Fell+Double+Pica'
		)) => 'IM Fell Double Pica',
		serialize(array(
			'font-family' => "'IM Fell Double Pica SC', serif;",
			'css-name'=>'IM+Fell+Double+Pica+SC'
		)) => 'IM Fell Double Pica SC',
		serialize(array(
			'font-family' => "'IM Fell English', serif;",
			'css-name'=>'IM+Fell+English'
		)) => 'IM Fell English',
		serialize(array(
			'font-family' => "'IM Fell English SC', serif;",
			'css-name'=>'IM+Fell+English+SC'
		)) => 'IM Fell English SC',
		serialize(array(
			'font-family' => "'IM Fell French Canon', serif;",
			'css-name'=>'IM+Fell+French+Canon'
		)) => 'IM Fell French Canon',
		serialize(array(
			'font-family' => "'IM Fell French Canon SC', serif;",
			'css-name'=>'IM+Fell+French+Canon+SC'
		)) => 'IM Fell French Canon SC',
		serialize(array(
			'font-family' => "'IM Fell Great Primer', serif;",
			'css-name'=>'IM+Fell+Great+Primer'
		)) => 'IM Fell Great Primer',
		serialize(array(
			'font-family' => "'IM Fell Great Primer SC', serif;",
			'css-name'=>'IM+Fell+Great+Primer+SC'
		)) => 'IM Fell Great Primer SC',
		serialize(array(
			'font-family' => "'Iceberg', display;",
			'css-name'=>'Iceberg'
		)) => 'Iceberg',
		serialize(array(
			'font-family' => "'Iceland', display;",
			'css-name'=>'Iceland'
		)) => 'Iceland',
		serialize(array(
			'font-family' => "'Imprima', sans-serif;",
			'css-name'=>'Imprima'
		)) => 'Imprima',
		serialize(array(
			'font-family' => "'Inconsolata', monospace;",
			'css-name'=>'Inconsolata'
		)) => 'Inconsolata',
		serialize(array(
			'font-family' => "'Inder', sans-serif;",
			'css-name'=>'Inder'
		)) => 'Inder',
		serialize(array(
			'font-family' => "'Indie Flower', handwriting;",
			'css-name'=>'Indie+Flower'
		)) => 'Indie Flower',
		serialize(array(
			'font-family' => "'Inika', serif;",
			'css-name'=>'Inika'
		)) => 'Inika',
		serialize(array(
			'font-family' => "'Irish Grover', display;",
			'css-name'=>'Irish+Grover'
		)) => 'Irish Grover',
		serialize(array(
			'font-family' => "'Istok Web', sans-serif;",
			'css-name'=>'Istok+Web'
		)) => 'Istok Web',
		serialize(array(
			'font-family' => "'Italiana', serif;",
			'css-name'=>'Italiana'
		)) => 'Italiana',
		serialize(array(
			'font-family' => "'Italianno', handwriting;",
			'css-name'=>'Italianno'
		)) => 'Italianno',
		serialize(array(
			'font-family' => "'Jacques Francois', serif;",
			'css-name'=>'Jacques+Francois'
		)) => 'Jacques Francois',
		serialize(array(
			'font-family' => "'Jacques Francois Shadow', display;",
			'css-name'=>'Jacques+Francois+Shadow'
		)) => 'Jacques Francois Shadow',
		serialize(array(
			'font-family' => "'Jim Nightshade', handwriting;",
			'css-name'=>'Jim+Nightshade'
		)) => 'Jim Nightshade',
		serialize(array(
			'font-family' => "'Jockey One', sans-serif;",
			'css-name'=>'Jockey+One'
		)) => 'Jockey One',
		serialize(array(
			'font-family' => "'Jolly Lodger', display;",
			'css-name'=>'Jolly+Lodger'
		)) => 'Jolly Lodger',
		serialize(array(
			'font-family' => "'Josefin Sans', sans-serif;",
			'css-name'=>'Josefin+Sans'
		)) => 'Josefin Sans',
		serialize(array(
			'font-family' => "'Josefin Slab', serif;",
			'css-name'=>'Josefin+Slab'
		)) => 'Josefin Slab',
		serialize(array(
			'font-family' => "'Joti One', display;",
			'css-name'=>'Joti+One'
		)) => 'Joti One',
		serialize(array(
			'font-family' => "'Judson', serif;",
			'css-name'=>'Judson'
		)) => 'Judson',
		serialize(array(
			'font-family' => "'Julee', handwriting;",
			'css-name'=>'Julee'
		)) => 'Julee',
		serialize(array(
			'font-family' => "'Julius Sans One', sans-serif;",
			'css-name'=>'Julius+Sans+One'
		)) => 'Julius Sans One',
		serialize(array(
			'font-family' => "'Junge', serif;",
			'css-name'=>'Junge'
		)) => 'Junge',
		serialize(array(
			'font-family' => "'Jura', sans-serif;",
			'css-name'=>'Jura'
		)) => 'Jura',
		serialize(array(
			'font-family' => "'Just Another Hand', handwriting;",
			'css-name'=>'Just+Another+Hand'
		)) => 'Just Another Hand',
		serialize(array(
			'font-family' => "'Just Me Again Down Here', handwriting;",
			'css-name'=>'Just+Me+Again+Down+Here'
		)) => 'Just Me Again Down Here',
		serialize(array(
			'font-family' => "'Kameron', serif;",
			'css-name'=>'Kameron'
		)) => 'Kameron',
		serialize(array(
			'font-family' => "'Kantumruy', sans-serif;",
			'css-name'=>'Kantumruy'
		)) => 'Kantumruy',
		serialize(array(
			'font-family' => "'Karla', sans-serif;",
			'css-name'=>'Karla'
		)) => 'Karla',
		serialize(array(
			'font-family' => "'Kaushan Script', handwriting;",
			'css-name'=>'Kaushan+Script'
		)) => 'Kaushan Script',
		serialize(array(
			'font-family' => "'Kavoon', display;",
			'css-name'=>'Kavoon'
		)) => 'Kavoon',
		serialize(array(
			'font-family' => "'Kdam Thmor', display;",
			'css-name'=>'Kdam+Thmor'
		)) => 'Kdam Thmor',
		serialize(array(
			'font-family' => "'Keania One', display;",
			'css-name'=>'Keania+One'
		)) => 'Keania One',
		serialize(array(
			'font-family' => "'Kelly Slab', display;",
			'css-name'=>'Kelly+Slab'
		)) => 'Kelly Slab',
		serialize(array(
			'font-family' => "'Kenia', display;",
			'css-name'=>'Kenia'
		)) => 'Kenia',
		serialize(array(
			'font-family' => "'Khmer', display;",
			'css-name'=>'Khmer'
		)) => 'Khmer',
		serialize(array(
			'font-family' => "'Kite One', sans-serif;",
			'css-name'=>'Kite+One'
		)) => 'Kite One',
		serialize(array(
			'font-family' => "'Knewave', display;",
			'css-name'=>'Knewave'
		)) => 'Knewave',
		serialize(array(
			'font-family' => "'Kotta One', serif;",
			'css-name'=>'Kotta+One'
		)) => 'Kotta One',
		serialize(array(
			'font-family' => "'Koulen', display;",
			'css-name'=>'Koulen'
		)) => 'Koulen',
		serialize(array(
			'font-family' => "'Kranky', display;",
			'css-name'=>'Kranky'
		)) => 'Kranky',
		serialize(array(
			'font-family' => "'Kreon', serif;",
			'css-name'=>'Kreon'
		)) => 'Kreon',
		serialize(array(
			'font-family' => "'Kristi', handwriting;",
			'css-name'=>'Kristi'
		)) => 'Kristi',
		serialize(array(
			'font-family' => "'Krona One', sans-serif;",
			'css-name'=>'Krona+One'
		)) => 'Krona One',
		serialize(array(
			'font-family' => "'La Belle Aurore', handwriting;",
			'css-name'=>'La+Belle+Aurore'
		)) => 'La Belle Aurore',
		serialize(array(
			'font-family' => "'Lancelot', display;",
			'css-name'=>'Lancelot'
		)) => 'Lancelot',
		serialize(array(
			'font-family' => "'Lato', sans-serif;",
			'css-name'=>'Lato'
		)) => 'Lato',
		serialize(array(
			'font-family' => "'League Script', handwriting;",
			'css-name'=>'League+Script'
		)) => 'League Script',
		serialize(array(
			'font-family' => "'Leckerli One', handwriting;",
			'css-name'=>'Leckerli+One'
		)) => 'Leckerli One',
		serialize(array(
			'font-family' => "'Ledger', serif;",
			'css-name'=>'Ledger'
		)) => 'Ledger',
		serialize(array(
			'font-family' => "'Lekton', sans-serif;",
			'css-name'=>'Lekton'
		)) => 'Lekton',
		serialize(array(
			'font-family' => "'Lemon', display;",
			'css-name'=>'Lemon'
		)) => 'Lemon',
		serialize(array(
			'font-family' => "'Libre Baskerville', serif;",
			'css-name'=>'Libre+Baskerville'
		)) => 'Libre Baskerville',
		serialize(array(
			'font-family' => "'Life Savers', display;",
			'css-name'=>'Life+Savers'
		)) => 'Life Savers',
		serialize(array(
			'font-family' => "'Lilita One', display;",
			'css-name'=>'Lilita+One'
		)) => 'Lilita One',
		serialize(array(
			'font-family' => "'Lily Script One', display;",
			'css-name'=>'Lily+Script+One'
		)) => 'Lily Script One',
		serialize(array(
			'font-family' => "'Limelight', display;",
			'css-name'=>'Limelight'
		)) => 'Limelight',
		serialize(array(
			'font-family' => "'Linden Hill', serif;",
			'css-name'=>'Linden+Hill'
		)) => 'Linden Hill',
		serialize(array(
			'font-family' => "'Lobster', display;",
			'css-name'=>'Lobster'
		)) => 'Lobster',
		serialize(array(
			'font-family' => "'Lobster Two', display;",
			'css-name'=>'Lobster+Two'
		)) => 'Lobster Two',
		serialize(array(
			'font-family' => "'Londrina Outline', display;",
			'css-name'=>'Londrina+Outline'
		)) => 'Londrina Outline',
		serialize(array(
			'font-family' => "'Londrina Shadow', display;",
			'css-name'=>'Londrina+Shadow'
		)) => 'Londrina Shadow',
		serialize(array(
			'font-family' => "'Londrina Sketch', display;",
			'css-name'=>'Londrina+Sketch'
		)) => 'Londrina Sketch',
		serialize(array(
			'font-family' => "'Londrina Solid', display;",
			'css-name'=>'Londrina+Solid'
		)) => 'Londrina Solid',
		serialize(array(
			'font-family' => "'Lora', serif;",
			'css-name'=>'Lora'
		)) => 'Lora',
		serialize(array(
			'font-family' => "'Love Ya Like A Sister', display;",
			'css-name'=>'Love+Ya+Like+A+Sister'
		)) => 'Love Ya Like A Sister',
		serialize(array(
			'font-family' => "'Loved by the King', handwriting;",
			'css-name'=>'Loved+by+the+King'
		)) => 'Loved by the King',
		serialize(array(
			'font-family' => "'Lovers Quarrel', handwriting;",
			'css-name'=>'Lovers+Quarrel'
		)) => 'Lovers Quarrel',
		serialize(array(
			'font-family' => "'Luckiest Guy', display;",
			'css-name'=>'Luckiest+Guy'
		)) => 'Luckiest Guy',
		serialize(array(
			'font-family' => "'Lusitana', serif;",
			'css-name'=>'Lusitana'
		)) => 'Lusitana',
		serialize(array(
			'font-family' => "'Lustria', serif;",
			'css-name'=>'Lustria'
		)) => 'Lustria',
		serialize(array(
			'font-family' => "'Macondo', display;",
			'css-name'=>'Macondo'
		)) => 'Macondo',
		serialize(array(
			'font-family' => "'Macondo Swash Caps', display;",
			'css-name'=>'Macondo+Swash+Caps'
		)) => 'Macondo Swash Caps',
		serialize(array(
			'font-family' => "'Magra', sans-serif;",
			'css-name'=>'Magra'
		)) => 'Magra',
		serialize(array(
			'font-family' => "'Maiden Orange', display;",
			'css-name'=>'Maiden+Orange'
		)) => 'Maiden Orange',
		serialize(array(
			'font-family' => "'Mako', sans-serif;",
			'css-name'=>'Mako'
		)) => 'Mako',
		serialize(array(
			'font-family' => "'Marcellus', serif;",
			'css-name'=>'Marcellus'
		)) => 'Marcellus',
		serialize(array(
			'font-family' => "'Marcellus SC', serif;",
			'css-name'=>'Marcellus+SC'
		)) => 'Marcellus SC',
		serialize(array(
			'font-family' => "'Marck Script', handwriting;",
			'css-name'=>'Marck+Script'
		)) => 'Marck Script',
		serialize(array(
			'font-family' => "'Margarine', display;",
			'css-name'=>'Margarine'
		)) => 'Margarine',
		serialize(array(
			'font-family' => "'Marko One', serif;",
			'css-name'=>'Marko+One'
		)) => 'Marko One',
		serialize(array(
			'font-family' => "'Marmelad', sans-serif;",
			'css-name'=>'Marmelad'
		)) => 'Marmelad',
		serialize(array(
			'font-family' => "'Marvel', sans-serif;",
			'css-name'=>'Marvel'
		)) => 'Marvel',
		serialize(array(
			'font-family' => "'Mate', serif;",
			'css-name'=>'Mate'
		)) => 'Mate',
		serialize(array(
			'font-family' => "'Mate SC', serif;",
			'css-name'=>'Mate+SC'
		)) => 'Mate SC',
		serialize(array(
			'font-family' => "'Maven Pro', sans-serif;",
			'css-name'=>'Maven+Pro'
		)) => 'Maven Pro',
		serialize(array(
			'font-family' => "'McLaren', display;",
			'css-name'=>'McLaren'
		)) => 'McLaren',
		serialize(array(
			'font-family' => "'Meddon', handwriting;",
			'css-name'=>'Meddon'
		)) => 'Meddon',
		serialize(array(
			'font-family' => "'MedievalSharp', display;",
			'css-name'=>'MedievalSharp'
		)) => 'MedievalSharp',
		serialize(array(
			'font-family' => "'Medula One', display;",
			'css-name'=>'Medula+One'
		)) => 'Medula One',
		serialize(array(
			'font-family' => "'Megrim', display;",
			'css-name'=>'Megrim'
		)) => 'Megrim',
		serialize(array(
			'font-family' => "'Meie Script', handwriting;",
			'css-name'=>'Meie+Script'
		)) => 'Meie Script',
		serialize(array(
			'font-family' => "'Merienda', handwriting;",
			'css-name'=>'Merienda'
		)) => 'Merienda',
		serialize(array(
			'font-family' => "'Merienda One', handwriting;",
			'css-name'=>'Merienda+One'
		)) => 'Merienda One',
		serialize(array(
			'font-family' => "'Merriweather', serif;",
			'css-name'=>'Merriweather'
		)) => 'Merriweather',
		serialize(array(
			'font-family' => "'Merriweather Sans', sans-serif;",
			'css-name'=>'Merriweather+Sans'
		)) => 'Merriweather Sans',
		serialize(array(
			'font-family' => "'Metal', display;",
			'css-name'=>'Metal'
		)) => 'Metal',
		serialize(array(
			'font-family' => "'Metal Mania', display;",
			'css-name'=>'Metal+Mania'
		)) => 'Metal Mania',
		serialize(array(
			'font-family' => "'Metamorphous', display;",
			'css-name'=>'Metamorphous'
		)) => 'Metamorphous',
		serialize(array(
			'font-family' => "'Metrophobic', sans-serif;",
			'css-name'=>'Metrophobic'
		)) => 'Metrophobic',
		serialize(array(
			'font-family' => "'Michroma', sans-serif;",
			'css-name'=>'Michroma'
		)) => 'Michroma',
		serialize(array(
			'font-family' => "'Milonga', display;",
			'css-name'=>'Milonga'
		)) => 'Milonga',
		serialize(array(
			'font-family' => "'Miltonian', display;",
			'css-name'=>'Miltonian'
		)) => 'Miltonian',
		serialize(array(
			'font-family' => "'Miltonian Tattoo', display;",
			'css-name'=>'Miltonian+Tattoo'
		)) => 'Miltonian Tattoo',
		serialize(array(
			'font-family' => "'Miniver', display;",
			'css-name'=>'Miniver'
		)) => 'Miniver',
		serialize(array(
			'font-family' => "'Miss Fajardose', handwriting;",
			'css-name'=>'Miss+Fajardose'
		)) => 'Miss Fajardose',
		serialize(array(
			'font-family' => "'Modern Antiqua', display;",
			'css-name'=>'Modern+Antiqua'
		)) => 'Modern Antiqua',
		serialize(array(
			'font-family' => "'Molengo', sans-serif;",
			'css-name'=>'Molengo'
		)) => 'Molengo',
		serialize(array(
			'font-family' => "'Molle', handwriting;",
			'css-name'=>'Molle'
		)) => 'Molle',
		serialize(array(
			'font-family' => "'Monda', sans-serif;",
			'css-name'=>'Monda'
		)) => 'Monda',
		serialize(array(
			'font-family' => "'Monofett', display;",
			'css-name'=>'Monofett'
		)) => 'Monofett',
		serialize(array(
			'font-family' => "'Monoton', display;",
			'css-name'=>'Monoton'
		)) => 'Monoton',
		serialize(array(
			'font-family' => "'Monsieur La Doulaise', handwriting;",
			'css-name'=>'Monsieur+La+Doulaise'
		)) => 'Monsieur La Doulaise',
		serialize(array(
			'font-family' => "'Montaga', serif;",
			'css-name'=>'Montaga'
		)) => 'Montaga',
		serialize(array(
			'font-family' => "'Montez', handwriting;",
			'css-name'=>'Montez'
		)) => 'Montez',
		serialize(array(
			'font-family' => "'Montserrat', sans-serif;",
			'css-name'=>'Montserrat'
		)) => 'Montserrat',
		serialize(array(
			'font-family' => "'Montserrat Alternates', sans-serif;",
			'css-name'=>'Montserrat+Alternates'
		)) => 'Montserrat Alternates',
		serialize(array(
			'font-family' => "'Montserrat Subrayada', sans-serif;",
			'css-name'=>'Montserrat+Subrayada'
		)) => 'Montserrat Subrayada',
		serialize(array(
			'font-family' => "'Moul', display;",
			'css-name'=>'Moul'
		)) => 'Moul',
		serialize(array(
			'font-family' => "'Moulpali', display;",
			'css-name'=>'Moulpali'
		)) => 'Moulpali',
		serialize(array(
			'font-family' => "'Mountains of Christmas', display;",
			'css-name'=>'Mountains+of+Christmas'
		)) => 'Mountains of Christmas',
		serialize(array(
			'font-family' => "'Mouse Memoirs', sans-serif;",
			'css-name'=>'Mouse+Memoirs'
		)) => 'Mouse Memoirs',
		serialize(array(
			'font-family' => "'Mr Bedfort', handwriting;",
			'css-name'=>'Mr+Bedfort'
		)) => 'Mr Bedfort',
		serialize(array(
			'font-family' => "'Mr Dafoe', handwriting;",
			'css-name'=>'Mr+Dafoe'
		)) => 'Mr Dafoe',
		serialize(array(
			'font-family' => "'Mr De Haviland', handwriting;",
			'css-name'=>'Mr+De+Haviland'
		)) => 'Mr De Haviland',
		serialize(array(
			'font-family' => "'Mrs Saint Delafield', handwriting;",
			'css-name'=>'Mrs+Saint+Delafield'
		)) => 'Mrs Saint Delafield',
		serialize(array(
			'font-family' => "'Mrs Sheppards', handwriting;",
			'css-name'=>'Mrs+Sheppards'
		)) => 'Mrs Sheppards',
		serialize(array(
			'font-family' => "'Muli', sans-serif;",
			'css-name'=>'Muli'
		)) => 'Muli',
		serialize(array(
			'font-family' => "'Mystery Quest', display;",
			'css-name'=>'Mystery+Quest'
		)) => 'Mystery Quest',
		serialize(array(
			'font-family' => "'Neucha', handwriting;",
			'css-name'=>'Neucha'
		)) => 'Neucha',
		serialize(array(
			'font-family' => "'Neuton', serif;",
			'css-name'=>'Neuton'
		)) => 'Neuton',
		serialize(array(
			'font-family' => "'New Rocker', display;",
			'css-name'=>'New+Rocker'
		)) => 'New Rocker',
		serialize(array(
			'font-family' => "'News Cycle', sans-serif;",
			'css-name'=>'News+Cycle'
		)) => 'News Cycle',
		serialize(array(
			'font-family' => "'Niconne', handwriting;",
			'css-name'=>'Niconne'
		)) => 'Niconne',
		serialize(array(
			'font-family' => "'Nixie One', display;",
			'css-name'=>'Nixie+One'
		)) => 'Nixie One',
		serialize(array(
			'font-family' => "'Nobile', sans-serif;",
			'css-name'=>'Nobile'
		)) => 'Nobile',
		serialize(array(
			'font-family' => "'Nokora', serif;",
			'css-name'=>'Nokora'
		)) => 'Nokora',
		serialize(array(
			'font-family' => "'Norican', handwriting;",
			'css-name'=>'Norican'
		)) => 'Norican',
		serialize(array(
			'font-family' => "'Nosifer', display;",
			'css-name'=>'Nosifer'
		)) => 'Nosifer',
		serialize(array(
			'font-family' => "'Nothing You Could Do', handwriting;",
			'css-name'=>'Nothing+You+Could+Do'
		)) => 'Nothing You Could Do',
		serialize(array(
			'font-family' => "'Noticia Text', serif;",
			'css-name'=>'Noticia+Text'
		)) => 'Noticia Text',
		serialize(array(
			'font-family' => "'Noto Sans', sans-serif;",
			'css-name'=>'Noto+Sans'
		)) => 'Noto Sans',
		serialize(array(
			'font-family' => "'Noto Serif', serif;",
			'css-name'=>'Noto+Serif'
		)) => 'Noto Serif',
		serialize(array(
			'font-family' => "'Nova Cut', display;",
			'css-name'=>'Nova+Cut'
		)) => 'Nova Cut',
		serialize(array(
			'font-family' => "'Nova Flat', display;",
			'css-name'=>'Nova+Flat'
		)) => 'Nova Flat',
		serialize(array(
			'font-family' => "'Nova Mono', monospace;",
			'css-name'=>'Nova+Mono'
		)) => 'Nova Mono',
		serialize(array(
			'font-family' => "'Nova Oval', display;",
			'css-name'=>'Nova+Oval'
		)) => 'Nova Oval',
		serialize(array(
			'font-family' => "'Nova Round', display;",
			'css-name'=>'Nova+Round'
		)) => 'Nova Round',
		serialize(array(
			'font-family' => "'Nova Script', display;",
			'css-name'=>'Nova+Script'
		)) => 'Nova Script',
		serialize(array(
			'font-family' => "'Nova Slim', display;",
			'css-name'=>'Nova+Slim'
		)) => 'Nova Slim',
		serialize(array(
			'font-family' => "'Nova Square', display;",
			'css-name'=>'Nova+Square'
		)) => 'Nova Square',
		serialize(array(
			'font-family' => "'Numans', sans-serif;",
			'css-name'=>'Numans'
		)) => 'Numans',
		serialize(array(
			'font-family' => "'Nunito', sans-serif;",
			'css-name'=>'Nunito'
		)) => 'Nunito',
		serialize(array(
			'font-family' => "'Odor Mean Chey', display;",
			'css-name'=>'Odor+Mean+Chey'
		)) => 'Odor Mean Chey',
		serialize(array(
			'font-family' => "'Offside', display;",
			'css-name'=>'Offside'
		)) => 'Offside',
		serialize(array(
			'font-family' => "'Old Standard TT', serif;",
			'css-name'=>'Old+Standard+TT'
		)) => 'Old Standard TT',
		serialize(array(
			'font-family' => "'Oldenburg', display;",
			'css-name'=>'Oldenburg'
		)) => 'Oldenburg',
		serialize(array(
			'font-family' => "'Oleo Script', display;",
			'css-name'=>'Oleo+Script'
		)) => 'Oleo Script',
		serialize(array(
			'font-family' => "'Oleo Script Swash Caps', display;",
			'css-name'=>'Oleo+Script+Swash+Caps'
		)) => 'Oleo Script Swash Caps',
		serialize(array(
			'font-family' => "'Open Sans', sans-serif;",
			'css-name'=>'Open+Sans'
		)) => 'Open Sans',
		serialize(array(
			'font-family' => "'Open Sans Condensed', sans-serif;",
			'css-name'=>'Open+Sans+Condensed'
		)) => 'Open Sans Condensed',
		serialize(array(
			'font-family' => "'Oranienbaum', serif;",
			'css-name'=>'Oranienbaum'
		)) => 'Oranienbaum',
		serialize(array(
			'font-family' => "'Orbitron', sans-serif;",
			'css-name'=>'Orbitron'
		)) => 'Orbitron',
		serialize(array(
			'font-family' => "'Oregano', display;",
			'css-name'=>'Oregano'
		)) => 'Oregano',
		serialize(array(
			'font-family' => "'Orienta', sans-serif;",
			'css-name'=>'Orienta'
		)) => 'Orienta',
		serialize(array(
			'font-family' => "'Original Surfer', display;",
			'css-name'=>'Original+Surfer'
		)) => 'Original Surfer',
		serialize(array(
			'font-family' => "'Oswald', sans-serif;",
			'css-name'=>'Oswald'
		)) => 'Oswald',
		serialize(array(
			'font-family' => "'Over the Rainbow', handwriting;",
			'css-name'=>'Over+the+Rainbow'
		)) => 'Over the Rainbow',
		serialize(array(
			'font-family' => "'Overlock', display;",
			'css-name'=>'Overlock'
		)) => 'Overlock',
		serialize(array(
			'font-family' => "'Overlock SC', display;",
			'css-name'=>'Overlock+SC'
		)) => 'Overlock SC',
		serialize(array(
			'font-family' => "'Ovo', serif;",
			'css-name'=>'Ovo'
		)) => 'Ovo',
		serialize(array(
			'font-family' => "'Oxygen', sans-serif;",
			'css-name'=>'Oxygen'
		)) => 'Oxygen',
		serialize(array(
			'font-family' => "'Oxygen Mono', monospace;",
			'css-name'=>'Oxygen+Mono'
		)) => 'Oxygen Mono',
		serialize(array(
			'font-family' => "'PT Mono', monospace;",
			'css-name'=>'PT+Mono'
		)) => 'PT Mono',
		serialize(array(
			'font-family' => "'PT Sans', sans-serif;",
			'css-name'=>'PT+Sans'
		)) => 'PT Sans',
		serialize(array(
			'font-family' => "'PT Sans Caption', sans-serif;",
			'css-name'=>'PT+Sans+Caption'
		)) => 'PT Sans Caption',
		serialize(array(
			'font-family' => "'PT Sans Narrow', sans-serif;",
			'css-name'=>'PT+Sans+Narrow'
		)) => 'PT Sans Narrow',
		serialize(array(
			'font-family' => "'PT Serif', serif;",
			'css-name'=>'PT+Serif'
		)) => 'PT Serif',
		serialize(array(
			'font-family' => "'PT Serif Caption', serif;",
			'css-name'=>'PT+Serif+Caption'
		)) => 'PT Serif Caption',
		serialize(array(
			'font-family' => "'Pacifico', handwriting;",
			'css-name'=>'Pacifico'
		)) => 'Pacifico',
		serialize(array(
			'font-family' => "'Paprika', display;",
			'css-name'=>'Paprika'
		)) => 'Paprika',
		serialize(array(
			'font-family' => "'Parisienne', handwriting;",
			'css-name'=>'Parisienne'
		)) => 'Parisienne',
		serialize(array(
			'font-family' => "'Passero One', display;",
			'css-name'=>'Passero+One'
		)) => 'Passero One',
		serialize(array(
			'font-family' => "'Passion One', display;",
			'css-name'=>'Passion+One'
		)) => 'Passion One',
		serialize(array(
			'font-family' => "'Pathway Gothic One', sans-serif;",
			'css-name'=>'Pathway+Gothic+One'
		)) => 'Pathway Gothic One',
		serialize(array(
			'font-family' => "'Patrick Hand', handwriting;",
			'css-name'=>'Patrick+Hand'
		)) => 'Patrick Hand',
		serialize(array(
			'font-family' => "'Patrick Hand SC', handwriting;",
			'css-name'=>'Patrick+Hand+SC'
		)) => 'Patrick Hand SC',
		serialize(array(
			'font-family' => "'Patua One', display;",
			'css-name'=>'Patua+One'
		)) => 'Patua One',
		serialize(array(
			'font-family' => "'Paytone One', sans-serif;",
			'css-name'=>'Paytone+One'
		)) => 'Paytone One',
		serialize(array(
			'font-family' => "'Peralta', display;",
			'css-name'=>'Peralta'
		)) => 'Peralta',
		serialize(array(
			'font-family' => "'Permanent Marker', handwriting;",
			'css-name'=>'Permanent+Marker'
		)) => 'Permanent Marker',
		serialize(array(
			'font-family' => "'Petit Formal Script', handwriting;",
			'css-name'=>'Petit+Formal+Script'
		)) => 'Petit Formal Script',
		serialize(array(
			'font-family' => "'Petrona', serif;",
			'css-name'=>'Petrona'
		)) => 'Petrona',
		serialize(array(
			'font-family' => "'Philosopher', sans-serif;",
			'css-name'=>'Philosopher'
		)) => 'Philosopher',
		serialize(array(
			'font-family' => "'Piedra', display;",
			'css-name'=>'Piedra'
		)) => 'Piedra',
		serialize(array(
			'font-family' => "'Pinyon Script', handwriting;",
			'css-name'=>'Pinyon+Script'
		)) => 'Pinyon Script',
		serialize(array(
			'font-family' => "'Pirata One', display;",
			'css-name'=>'Pirata+One'
		)) => 'Pirata One',
		serialize(array(
			'font-family' => "'Plaster', display;",
			'css-name'=>'Plaster'
		)) => 'Plaster',
		serialize(array(
			'font-family' => "'Play', sans-serif;",
			'css-name'=>'Play'
		)) => 'Play',
		serialize(array(
			'font-family' => "'Playball', display;",
			'css-name'=>'Playball'
		)) => 'Playball',
		serialize(array(
			'font-family' => "'Playfair Display', serif;",
			'css-name'=>'Playfair+Display'
		)) => 'Playfair Display',
		serialize(array(
			'font-family' => "'Playfair Display SC', serif;",
			'css-name'=>'Playfair+Display+SC'
		)) => 'Playfair Display SC',
		serialize(array(
			'font-family' => "'Podkova', serif;",
			'css-name'=>'Podkova'
		)) => 'Podkova',
		serialize(array(
			'font-family' => "'Poiret One', display;",
			'css-name'=>'Poiret+One'
		)) => 'Poiret One',
		serialize(array(
			'font-family' => "'Poller One', display;",
			'css-name'=>'Poller+One'
		)) => 'Poller One',
		serialize(array(
			'font-family' => "'Poly', serif;",
			'css-name'=>'Poly'
		)) => 'Poly',
		serialize(array(
			'font-family' => "'Pompiere', display;",
			'css-name'=>'Pompiere'
		)) => 'Pompiere',
		serialize(array(
			'font-family' => "'Pontano Sans', sans-serif;",
			'css-name'=>'Pontano+Sans'
		)) => 'Pontano Sans',
		serialize(array(
			'font-family' => "'Port Lligat Sans', sans-serif;",
			'css-name'=>'Port+Lligat+Sans'
		)) => 'Port Lligat Sans',
		serialize(array(
			'font-family' => "'Port Lligat Slab', serif;",
			'css-name'=>'Port+Lligat+Slab'
		)) => 'Port Lligat Slab',
		serialize(array(
			'font-family' => "'Prata', serif;",
			'css-name'=>'Prata'
		)) => 'Prata',
		serialize(array(
			'font-family' => "'Preahvihear', display;",
			'css-name'=>'Preahvihear'
		)) => 'Preahvihear',
		serialize(array(
			'font-family' => "'Press Start 2P', display;",
			'css-name'=>'Press+Start+2P'
		)) => 'Press Start 2P',
		serialize(array(
			'font-family' => "'Princess Sofia', handwriting;",
			'css-name'=>'Princess+Sofia'
		)) => 'Princess Sofia',
		serialize(array(
			'font-family' => "'Prociono', serif;",
			'css-name'=>'Prociono'
		)) => 'Prociono',
		serialize(array(
			'font-family' => "'Prosto One', display;",
			'css-name'=>'Prosto+One'
		)) => 'Prosto One',
		serialize(array(
			'font-family' => "'Puritan', sans-serif;",
			'css-name'=>'Puritan'
		)) => 'Puritan',
		serialize(array(
			'font-family' => "'Purple Purse', display;",
			'css-name'=>'Purple+Purse'
		)) => 'Purple Purse',
		serialize(array(
			'font-family' => "'Quando', serif;",
			'css-name'=>'Quando'
		)) => 'Quando',
		serialize(array(
			'font-family' => "'Quantico', sans-serif;",
			'css-name'=>'Quantico'
		)) => 'Quantico',
		serialize(array(
			'font-family' => "'Quattrocento', serif;",
			'css-name'=>'Quattrocento'
		)) => 'Quattrocento',
		serialize(array(
			'font-family' => "'Quattrocento Sans', sans-serif;",
			'css-name'=>'Quattrocento+Sans'
		)) => 'Quattrocento Sans',
		serialize(array(
			'font-family' => "'Questrial', sans-serif;",
			'css-name'=>'Questrial'
		)) => 'Questrial',
		serialize(array(
			'font-family' => "'Quicksand', sans-serif;",
			'css-name'=>'Quicksand'
		)) => 'Quicksand',
		serialize(array(
			'font-family' => "'Quintessential', handwriting;",
			'css-name'=>'Quintessential'
		)) => 'Quintessential',
		serialize(array(
			'font-family' => "'Qwigley', handwriting;",
			'css-name'=>'Qwigley'
		)) => 'Qwigley',
		serialize(array(
			'font-family' => "'Racing Sans One', display;",
			'css-name'=>'Racing+Sans+One'
		)) => 'Racing Sans One',
		serialize(array(
			'font-family' => "'Radley', serif;",
			'css-name'=>'Radley'
		)) => 'Radley',
		serialize(array(
			'font-family' => "'Raleway', sans-serif;",
			'css-name'=>'Raleway'
		)) => 'Raleway',
		serialize(array(
			'font-family' => "'Raleway Dots', display;",
			'css-name'=>'Raleway+Dots'
		)) => 'Raleway Dots',
		serialize(array(
			'font-family' => "'Rambla', sans-serif;",
			'css-name'=>'Rambla'
		)) => 'Rambla',
		serialize(array(
			'font-family' => "'Rammetto One', display;",
			'css-name'=>'Rammetto+One'
		)) => 'Rammetto One',
		serialize(array(
			'font-family' => "'Ranchers', display;",
			'css-name'=>'Ranchers'
		)) => 'Ranchers',
		serialize(array(
			'font-family' => "'Rancho', handwriting;",
			'css-name'=>'Rancho'
		)) => 'Rancho',
		serialize(array(
			'font-family' => "'Rationale', sans-serif;",
			'css-name'=>'Rationale'
		)) => 'Rationale',
		serialize(array(
			'font-family' => "'Redressed', handwriting;",
			'css-name'=>'Redressed'
		)) => 'Redressed',
		serialize(array(
			'font-family' => "'Reenie Beanie', handwriting;",
			'css-name'=>'Reenie+Beanie'
		)) => 'Reenie Beanie',
		serialize(array(
			'font-family' => "'Revalia', display;",
			'css-name'=>'Revalia'
		)) => 'Revalia',
		serialize(array(
			'font-family' => "'Ribeye', display;",
			'css-name'=>'Ribeye'
		)) => 'Ribeye',
		serialize(array(
			'font-family' => "'Ribeye Marrow', display;",
			'css-name'=>'Ribeye+Marrow'
		)) => 'Ribeye Marrow',
		serialize(array(
			'font-family' => "'Righteous', display;",
			'css-name'=>'Righteous'
		)) => 'Righteous',
		serialize(array(
			'font-family' => "'Risque', display;",
			'css-name'=>'Risque'
		)) => 'Risque',
		serialize(array(
			'font-family' => "'Roboto', sans-serif;",
			'css-name'=>'Roboto'
		)) => 'Roboto',
		serialize(array(
			'font-family' => "'Roboto Condensed', sans-serif;",
			'css-name'=>'Roboto+Condensed'
		)) => 'Roboto Condensed',
		serialize(array(
			'font-family' => "'Roboto Slab', serif;",
			'css-name'=>'Roboto+Slab'
		)) => 'Roboto Slab',
		serialize(array(
			'font-family' => "'Rochester', handwriting;",
			'css-name'=>'Rochester'
		)) => 'Rochester',
		serialize(array(
			'font-family' => "'Rock Salt', handwriting;",
			'css-name'=>'Rock+Salt'
		)) => 'Rock Salt',
		serialize(array(
			'font-family' => "'Rokkitt', serif;",
			'css-name'=>'Rokkitt'
		)) => 'Rokkitt',
		serialize(array(
			'font-family' => "'Romanesco', handwriting;",
			'css-name'=>'Romanesco'
		)) => 'Romanesco',
		serialize(array(
			'font-family' => "'Ropa Sans', sans-serif;",
			'css-name'=>'Ropa+Sans'
		)) => 'Ropa Sans',
		serialize(array(
			'font-family' => "'Rosario', sans-serif;",
			'css-name'=>'Rosario'
		)) => 'Rosario',
		serialize(array(
			'font-family' => "'Rosarivo', serif;",
			'css-name'=>'Rosarivo'
		)) => 'Rosarivo',
		serialize(array(
			'font-family' => "'Rouge Script', handwriting;",
			'css-name'=>'Rouge+Script'
		)) => 'Rouge Script',
		serialize(array(
			'font-family' => "'Rubik Mono One', sans-serif;",
			'css-name'=>'Rubik+Mono+One'
		)) => 'Rubik Mono One',
		serialize(array(
			'font-family' => "'Rubik One', sans-serif;",
			'css-name'=>'Rubik+One'
		)) => 'Rubik One',
		serialize(array(
			'font-family' => "'Ruda', sans-serif;",
			'css-name'=>'Ruda'
		)) => 'Ruda',
		serialize(array(
			'font-family' => "'Rufina', serif;",
			'css-name'=>'Rufina'
		)) => 'Rufina',
		serialize(array(
			'font-family' => "'Ruge Boogie', handwriting;",
			'css-name'=>'Ruge+Boogie'
		)) => 'Ruge Boogie',
		serialize(array(
			'font-family' => "'Ruluko', sans-serif;",
			'css-name'=>'Ruluko'
		)) => 'Ruluko',
		serialize(array(
			'font-family' => "'Rum Raisin', sans-serif;",
			'css-name'=>'Rum+Raisin'
		)) => 'Rum Raisin',
		serialize(array(
			'font-family' => "'Ruslan Display', display;",
			'css-name'=>'Ruslan+Display'
		)) => 'Ruslan Display',
		serialize(array(
			'font-family' => "'Russo One', sans-serif;",
			'css-name'=>'Russo+One'
		)) => 'Russo One',
		serialize(array(
			'font-family' => "'Ruthie', handwriting;",
			'css-name'=>'Ruthie'
		)) => 'Ruthie',
		serialize(array(
			'font-family' => "'Rye', display;",
			'css-name'=>'Rye'
		)) => 'Rye',
		serialize(array(
			'font-family' => "'Sacramento', handwriting;",
			'css-name'=>'Sacramento'
		)) => 'Sacramento',
		serialize(array(
			'font-family' => "'Sail', display;",
			'css-name'=>'Sail'
		)) => 'Sail',
		serialize(array(
			'font-family' => "'Salsa', display;",
			'css-name'=>'Salsa'
		)) => 'Salsa',
		serialize(array(
			'font-family' => "'Sanchez', serif;",
			'css-name'=>'Sanchez'
		)) => 'Sanchez',
		serialize(array(
			'font-family' => "'Sancreek', display;",
			'css-name'=>'Sancreek'
		)) => 'Sancreek',
		serialize(array(
			'font-family' => "'Sansita One', display;",
			'css-name'=>'Sansita+One'
		)) => 'Sansita One',
		serialize(array(
			'font-family' => "'Sarina', display;",
			'css-name'=>'Sarina'
		)) => 'Sarina',
		serialize(array(
			'font-family' => "'Satisfy', handwriting;",
			'css-name'=>'Satisfy'
		)) => 'Satisfy',
		serialize(array(
			'font-family' => "'Scada', sans-serif;",
			'css-name'=>'Scada'
		)) => 'Scada',
		serialize(array(
			'font-family' => "'Schoolbell', handwriting;",
			'css-name'=>'Schoolbell'
		)) => 'Schoolbell',
		serialize(array(
			'font-family' => "'Seaweed Script', display;",
			'css-name'=>'Seaweed+Script'
		)) => 'Seaweed Script',
		serialize(array(
			'font-family' => "'Sevillana', display;",
			'css-name'=>'Sevillana'
		)) => 'Sevillana',
		serialize(array(
			'font-family' => "'Seymour One', sans-serif;",
			'css-name'=>'Seymour+One'
		)) => 'Seymour One',
		serialize(array(
			'font-family' => "'Shadows Into Light', handwriting;",
			'css-name'=>'Shadows+Into+Light'
		)) => 'Shadows Into Light',
		serialize(array(
			'font-family' => "'Shadows Into Light Two', handwriting;",
			'css-name'=>'Shadows+Into+Light+Two'
		)) => 'Shadows Into Light Two',
		serialize(array(
			'font-family' => "'Shanti', sans-serif;",
			'css-name'=>'Shanti'
		)) => 'Shanti',
		serialize(array(
			'font-family' => "'Share', display;",
			'css-name'=>'Share'
		)) => 'Share',
		serialize(array(
			'font-family' => "'Share Tech', sans-serif;",
			'css-name'=>'Share+Tech'
		)) => 'Share Tech',
		serialize(array(
			'font-family' => "'Share Tech Mono', monospace;",
			'css-name'=>'Share+Tech+Mono'
		)) => 'Share Tech Mono',
		serialize(array(
			'font-family' => "'Shojumaru', display;",
			'css-name'=>'Shojumaru'
		)) => 'Shojumaru',
		serialize(array(
			'font-family' => "'Short Stack', handwriting;",
			'css-name'=>'Short+Stack'
		)) => 'Short Stack',
		serialize(array(
			'font-family' => "'Siemreap', display;",
			'css-name'=>'Siemreap'
		)) => 'Siemreap',
		serialize(array(
			'font-family' => "'Sigmar One', display;",
			'css-name'=>'Sigmar+One'
		)) => 'Sigmar One',
		serialize(array(
			'font-family' => "'Signika', sans-serif;",
			'css-name'=>'Signika'
		)) => 'Signika',
		serialize(array(
			'font-family' => "'Signika Negative', sans-serif;",
			'css-name'=>'Signika+Negative'
		)) => 'Signika Negative',
		serialize(array(
			'font-family' => "'Simonetta', display;",
			'css-name'=>'Simonetta'
		)) => 'Simonetta',
		serialize(array(
			'font-family' => "'Sintony', sans-serif;",
			'css-name'=>'Sintony'
		)) => 'Sintony',
		serialize(array(
			'font-family' => "'Sirin Stencil', display;",
			'css-name'=>'Sirin+Stencil'
		)) => 'Sirin Stencil',
		serialize(array(
			'font-family' => "'Six Caps', sans-serif;",
			'css-name'=>'Six+Caps'
		)) => 'Six Caps',
		serialize(array(
			'font-family' => "'Skranji', display;",
			'css-name'=>'Skranji'
		)) => 'Skranji',
		serialize(array(
			'font-family' => "'Slackey', display;",
			'css-name'=>'Slackey'
		)) => 'Slackey',
		serialize(array(
			'font-family' => "'Smokum', display;",
			'css-name'=>'Smokum'
		)) => 'Smokum',
		serialize(array(
			'font-family' => "'Smythe', display;",
			'css-name'=>'Smythe'
		)) => 'Smythe',
		serialize(array(
			'font-family' => "'Sniglet', display;",
			'css-name'=>'Sniglet'
		)) => 'Sniglet',
		serialize(array(
			'font-family' => "'Snippet', sans-serif;",
			'css-name'=>'Snippet'
		)) => 'Snippet',
		serialize(array(
			'font-family' => "'Snowburst One', display;",
			'css-name'=>'Snowburst+One'
		)) => 'Snowburst One',
		serialize(array(
			'font-family' => "'Sofadi One', display;",
			'css-name'=>'Sofadi+One'
		)) => 'Sofadi One',
		serialize(array(
			'font-family' => "'Sofia', handwriting;",
			'css-name'=>'Sofia'
		)) => 'Sofia',
		serialize(array(
			'font-family' => "'Sonsie One', display;",
			'css-name'=>'Sonsie+One'
		)) => 'Sonsie One',
		serialize(array(
			'font-family' => "'Sorts Mill Goudy', serif;",
			'css-name'=>'Sorts+Mill+Goudy'
		)) => 'Sorts Mill Goudy',
		serialize(array(
			'font-family' => "'Source Code Pro', monospace;",
			'css-name'=>'Source+Code+Pro'
		)) => 'Source Code Pro',
		serialize(array(
			'font-family' => "'Source Sans Pro', sans-serif;",
			'css-name'=>'Source+Sans+Pro'
		)) => 'Source Sans Pro',
		serialize(array(
			'font-family' => "'Special Elite', display;",
			'css-name'=>'Special+Elite'
		)) => 'Special Elite',
		serialize(array(
			'font-family' => "'Spicy Rice', display;",
			'css-name'=>'Spicy+Rice'
		)) => 'Spicy Rice',
		serialize(array(
			'font-family' => "'Spinnaker', sans-serif;",
			'css-name'=>'Spinnaker'
		)) => 'Spinnaker',
		serialize(array(
			'font-family' => "'Spirax', display;",
			'css-name'=>'Spirax'
		)) => 'Spirax',
		serialize(array(
			'font-family' => "'Squada One', display;",
			'css-name'=>'Squada+One'
		)) => 'Squada One',
		serialize(array(
			'font-family' => "'Stalemate', handwriting;",
			'css-name'=>'Stalemate'
		)) => 'Stalemate',
		serialize(array(
			'font-family' => "'Stalinist One', display;",
			'css-name'=>'Stalinist+One'
		)) => 'Stalinist One',
		serialize(array(
			'font-family' => "'Stardos Stencil', display;",
			'css-name'=>'Stardos+Stencil'
		)) => 'Stardos Stencil',
		serialize(array(
			'font-family' => "'Stint Ultra Condensed', display;",
			'css-name'=>'Stint+Ultra+Condensed'
		)) => 'Stint Ultra Condensed',
		serialize(array(
			'font-family' => "'Stint Ultra Expanded', display;",
			'css-name'=>'Stint+Ultra+Expanded'
		)) => 'Stint Ultra Expanded',
		serialize(array(
			'font-family' => "'Stoke', serif;",
			'css-name'=>'Stoke'
		)) => 'Stoke',
		serialize(array(
			'font-family' => "'Strait', sans-serif;",
			'css-name'=>'Strait'
		)) => 'Strait',
		serialize(array(
			'font-family' => "'Sue Ellen Francisco', handwriting;",
			'css-name'=>'Sue+Ellen+Francisco'
		)) => 'Sue Ellen Francisco',
		serialize(array(
			'font-family' => "'Sunshiney', handwriting;",
			'css-name'=>'Sunshiney'
		)) => 'Sunshiney',
		serialize(array(
			'font-family' => "'Supermercado One', display;",
			'css-name'=>'Supermercado+One'
		)) => 'Supermercado One',
		serialize(array(
			'font-family' => "'Suwannaphum', display;",
			'css-name'=>'Suwannaphum'
		)) => 'Suwannaphum',
		serialize(array(
			'font-family' => "'Swanky and Moo Moo', handwriting;",
			'css-name'=>'Swanky+and+Moo+Moo'
		)) => 'Swanky and Moo Moo',
		serialize(array(
			'font-family' => "'Syncopate', sans-serif;",
			'css-name'=>'Syncopate'
		)) => 'Syncopate',
		serialize(array(
			'font-family' => "'Tangerine', handwriting;",
			'css-name'=>'Tangerine'
		)) => 'Tangerine',
		serialize(array(
			'font-family' => "'Taprom', display;",
			'css-name'=>'Taprom'
		)) => 'Taprom',
		serialize(array(
			'font-family' => "'Tauri', sans-serif;",
			'css-name'=>'Tauri'
		)) => 'Tauri',
		serialize(array(
			'font-family' => "'Telex', sans-serif;",
			'css-name'=>'Telex'
		)) => 'Telex',
		serialize(array(
			'font-family' => "'Tenor Sans', sans-serif;",
			'css-name'=>'Tenor+Sans'
		)) => 'Tenor Sans',
		serialize(array(
			'font-family' => "'Text Me One', sans-serif;",
			'css-name'=>'Text+Me+One'
		)) => 'Text Me One',
		serialize(array(
			'font-family' => "'The Girl Next Door', handwriting;",
			'css-name'=>'The+Girl+Next+Door'
		)) => 'The Girl Next Door',
		serialize(array(
			'font-family' => "'Tienne', serif;",
			'css-name'=>'Tienne'
		)) => 'Tienne',
		serialize(array(
			'font-family' => "'Tinos', serif;",
			'css-name'=>'Tinos'
		)) => 'Tinos',
		serialize(array(
			'font-family' => "'Titan One', display;",
			'css-name'=>'Titan+One'
		)) => 'Titan One',
		serialize(array(
			'font-family' => "'Titillium Web', sans-serif;",
			'css-name'=>'Titillium+Web'
		)) => 'Titillium Web',
		serialize(array(
			'font-family' => "'Trade Winds', display;",
			'css-name'=>'Trade+Winds'
		)) => 'Trade Winds',
		serialize(array(
			'font-family' => "'Trocchi', serif;",
			'css-name'=>'Trocchi'
		)) => 'Trocchi',
		serialize(array(
			'font-family' => "'Trochut', display;",
			'css-name'=>'Trochut'
		)) => 'Trochut',
		serialize(array(
			'font-family' => "'Trykker', serif;",
			'css-name'=>'Trykker'
		)) => 'Trykker',
		serialize(array(
			'font-family' => "'Tulpen One', display;",
			'css-name'=>'Tulpen+One'
		)) => 'Tulpen One',
		serialize(array(
			'font-family' => "'Ubuntu', sans-serif;",
			'css-name'=>'Ubuntu'
		)) => 'Ubuntu',
		serialize(array(
			'font-family' => "'Ubuntu Condensed', sans-serif;",
			'css-name'=>'Ubuntu+Condensed'
		)) => 'Ubuntu Condensed',
		serialize(array(
			'font-family' => "'Ubuntu Mono', monospace;",
			'css-name'=>'Ubuntu+Mono'
		)) => 'Ubuntu Mono',
		serialize(array(
			'font-family' => "'Ultra', serif;",
			'css-name'=>'Ultra'
		)) => 'Ultra',
		serialize(array(
			'font-family' => "'Uncial Antiqua', display;",
			'css-name'=>'Uncial+Antiqua'
		)) => 'Uncial Antiqua',
		serialize(array(
			'font-family' => "'Underdog', display;",
			'css-name'=>'Underdog'
		)) => 'Underdog',
		serialize(array(
			'font-family' => "'Unica One', display;",
			'css-name'=>'Unica+One'
		)) => 'Unica One',
		serialize(array(
			'font-family' => "'UnifrakturCook', display;",
			'css-name'=>'UnifrakturCook'
		)) => 'UnifrakturCook',
		serialize(array(
			'font-family' => "'UnifrakturMaguntia', display;",
			'css-name'=>'UnifrakturMaguntia'
		)) => 'UnifrakturMaguntia',
		serialize(array(
			'font-family' => "'Unkempt', display;",
			'css-name'=>'Unkempt'
		)) => 'Unkempt',
		serialize(array(
			'font-family' => "'Unlock', display;",
			'css-name'=>'Unlock'
		)) => 'Unlock',
		serialize(array(
			'font-family' => "'Unna', serif;",
			'css-name'=>'Unna'
		)) => 'Unna',
		serialize(array(
			'font-family' => "'VT323', monospace;",
			'css-name'=>'VT323'
		)) => 'VT323',
		serialize(array(
			'font-family' => "'Vampiro One', display;",
			'css-name'=>'Vampiro+One'
		)) => 'Vampiro One',
		serialize(array(
			'font-family' => "'Varela', sans-serif;",
			'css-name'=>'Varela'
		)) => 'Varela',
		serialize(array(
			'font-family' => "'Varela Round', sans-serif;",
			'css-name'=>'Varela+Round'
		)) => 'Varela Round',
		serialize(array(
			'font-family' => "'Vast Shadow', display;",
			'css-name'=>'Vast+Shadow'
		)) => 'Vast Shadow',
		serialize(array(
			'font-family' => "'Vibur', handwriting;",
			'css-name'=>'Vibur'
		)) => 'Vibur',
		serialize(array(
			'font-family' => "'Vidaloka', serif;",
			'css-name'=>'Vidaloka'
		)) => 'Vidaloka',
		serialize(array(
			'font-family' => "'Viga', sans-serif;",
			'css-name'=>'Viga'
		)) => 'Viga',
		serialize(array(
			'font-family' => "'Voces', display;",
			'css-name'=>'Voces'
		)) => 'Voces',
		serialize(array(
			'font-family' => "'Volkhov', serif;",
			'css-name'=>'Volkhov'
		)) => 'Volkhov',
		serialize(array(
			'font-family' => "'Vollkorn', serif;",
			'css-name'=>'Vollkorn'
		)) => 'Vollkorn',
		serialize(array(
			'font-family' => "'Voltaire', sans-serif;",
			'css-name'=>'Voltaire'
		)) => 'Voltaire',
		serialize(array(
			'font-family' => "'Waiting for the Sunrise', handwriting;",
			'css-name'=>'Waiting+for+the+Sunrise'
		)) => 'Waiting for the Sunrise',
		serialize(array(
			'font-family' => "'Wallpoet', display;",
			'css-name'=>'Wallpoet'
		)) => 'Wallpoet',
		serialize(array(
			'font-family' => "'Walter Turncoat', handwriting;",
			'css-name'=>'Walter+Turncoat'
		)) => 'Walter Turncoat',
		serialize(array(
			'font-family' => "'Warnes', display;",
			'css-name'=>'Warnes'
		)) => 'Warnes',
		serialize(array(
			'font-family' => "'Wellfleet', display;",
			'css-name'=>'Wellfleet'
		)) => 'Wellfleet',
		serialize(array(
			'font-family' => "'Wendy One', sans-serif;",
			'css-name'=>'Wendy+One'
		)) => 'Wendy One',
		serialize(array(
			'font-family' => "'Wire One', sans-serif;",
			'css-name'=>'Wire+One'
		)) => 'Wire One',
		serialize(array(
			'font-family' => "'Yanone Kaffeesatz', sans-serif;",
			'css-name'=>'Yanone+Kaffeesatz'
		)) => 'Yanone Kaffeesatz',
		serialize(array(
			'font-family' => "'Yellowtail', handwriting;",
			'css-name'=>'Yellowtail'
		)) => 'Yellowtail',
		serialize(array(
			'font-family' => "'Yeseva One', display;",
			'css-name'=>'Yeseva+One'
		)) => 'Yeseva One',
		serialize(array(
			'font-family' => "'Yesteryear', handwriting;",
			'css-name'=>'Yesteryear'
		)) => 'Yesteryear',
		serialize(array(
			'font-family' => "'Zeyada', cursive;",
			'css-name' => 'Zeyada'
		)) => 'Zeyada'
	);

	/* --- SECTIONS --- */
	////////////////////////

	$wp_customize->remove_section( 'static_front_page');

	 $wp_customize->add_section('general', array(
		'title' => 'General',
		'priority' => 8
	));
	 $wp_customize->add_section('sidebar', array(
		'title' => 'Logo',
		'priority' => 10
	));
	 $wp_customize->add_section('nav', array(
		'title' => 'Navigation',
		'priority' => 90
	));
	 $wp_customize->add_section('portfolio', array(
		'title' => 'Portfolio',
		'priority' => 92
	));
	 $wp_customize->add_section('gallery', array(
		'title' => 'Gallery',
		'priority' => 93
	));
	 $wp_customize->add_section('blog', array(
		'title' => 'Blog',
		'priority' => 94
	));
	 $wp_customize->add_section('colors', array(
		'title' => 'Colors',
		'priority' => 96
	));
	 $wp_customize->add_section('typography', array(
		'title' => 'Typography',
		'priority' => 98
	));

	/* --- General --- */
	////////////////////////

	/* Sidebar behavior */

	$wp_customize->add_setting(
		'krown_sidebar_hide', array(
			'default' => 'Autohide',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_sidebar_hide', 
		array(
			'label' => 'Sidebar behavior',
			'section' => 'general',
			'settings' => 'krown_sidebar_hide',
			'type' => 'radio',
			'choices' => array(
				'Autohide' => 'Always hide',
				'Stick' => 'Always show'
			)
		)
	); 

	/* Layout Align */

	$wp_customize->add_setting(
		'krown_layout_style', array(
			'default' => 'Left',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_layout_style', 
		array(
			'label' => 'Page layout alignment',
			'section' => 'general',
			'settings' => 'krown_layout_style',
			'type' => 'radio',
			'choices' => array(
				'Left' => 'Align left',
				'Center' => 'Align center'
			)
		)
	);

	/* Footer copy */

	$wp_customize->add_setting(
		'krown_footer_copy', array(
			'default' => '',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_footer_copy', 
		array(
			'label' => 'Footer copyright',
			'section' => 'general',
			'settings' => 'krown_footer_copy',
			'type' => 'text'
		)
	);

	/* --- SIDEBAR --- */
	////////////////////////
 
	/* Logo */

	$wp_customize->add_setting(
		'krown_logo', array(
			'default' => '',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control(
	    new WP_Customize_Image_Control(
	        $wp_customize,
	        'krown_logo',
	        array(
	            'label' => 'Default logo',
	            'section' => 'sidebar',
	            'settings' => 'krown_logo'
	        )
	    )
	);
 
	/* Retina Logo */

	$wp_customize->add_setting(
		'krown_logo_x2', array(
			'default' => '',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control(
	    new WP_Customize_Image_Control(
	        $wp_customize,
	        'krown_logo_x2',
	        array(
	            'label' => 'Retina logo',
	            'section' => 'sidebar',
	            'settings' => 'krown_logo_x2'
	        )
	    )
	);
 
	/* Favicon */

	$wp_customize->add_setting(
		'krown_fav', array(
			'default' => '',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control(
	    new WP_Customize_Image_Control(
	        $wp_customize,
	        'krown_fav',
	        array(
	            'label' => 'Favicon',
	            'section' => 'sidebar',
	            'settings' => 'krown_fav'
	        )
	    )
	);

	/* Logo Width */

	$wp_customize->add_setting(
		'krown_logo_width', array(
			'default' => '156',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_logo_width', 
		array(
			'label' => 'Logo width',
			'section' => 'sidebar',
			'settings' => 'krown_logo_width',
			'type' => 'text'
		)
	);

	/* Logo Height */

	$wp_customize->add_setting(
		'krown_logo_height', array(
			'default' => '34',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_logo_height', 
		array(
			'label' => 'Logo height',
			'section' => 'sidebar',
			'settings' => 'krown_logo_height',
			'type' => 'text'
		)
	);

	/* --- PORTFOLIO --- */
	////////////////////////

	/* Portfolio page */

	$wp_customize->add_setting(
		'krown_folio_page', array(
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_folio_page', 
		array(
			'label' => 'Choose the portfolio page',
			'section' => 'portfolio',
			'settings' => 'krown_folio_page',
			'type' => 'dropdown-pages',
			'priority' => 1
		)
	);

	/* Thumbs hover */

	$wp_customize->add_setting(
		'krown_hover_style', array(
			'default' => 'style-1',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_hover_style', 
		array(
			'label' => 'Thumbs hover',
			'section' => 'portfolio',
			'settings' => 'krown_hover_style',
			'type' => 'select',
			'choices' => array(
				'style-1' => 'Style #1',
				'style-2' => 'Style #2',
			),
			'priority' => 2
		)
	);

	/* Thumbs opacity */

	$wp_customize->add_setting(
		'krown_thumbs_opacity', array(
			'default' => '.95',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_thumbs_opacity', 
		array(
			'label' => 'Thumbs opacity',
			'section' => 'portfolio',
			'settings' => 'krown_thumbs_opacity',
			'type' => 'text',
			'priority' => 3
		)
	);

	/* Thumbs ratio */

	$wp_customize->add_setting(
		'krown_thumbs_ratio', array(
			'default' => 'ratio_4-3',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_thumbs_ratio', 
		array(
			'label' => 'Thumbs ratio',
			'section' => 'portfolio',
			'settings' => 'krown_thumbs_ratio',
			'type' => 'select',
			'choices' => array(
				'ratio_4-3' => '4:3',
				'ratio_16-9' => '16:9',
				'ratio_16-10' => '16:10',
				'ratio_1-1' => '1:1'
			),
			'priority' => 3
		)
	);

	/* Thumbs width */

	$wp_customize->add_setting(
		'krown_thumbs_width', array(
			'default' => '340',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_thumbs_width', 
		array(
			'label' => 'Thumbs maximum width',
			'section' => 'portfolio',
			'settings' => 'krown_thumbs_width',
			'type' => 'text',
			'priority' => 4
		)
	);

	/* Pagination */

	$wp_customize->add_setting(
		'krown_folio_pagination', array(
			'default' => 'folio-pagination-off',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_folio_pagination', 
		array(
			'label' => 'Portfolio pagination',
			'section' => 'portfolio',
			'settings' => 'krown_folio_pagination',
			'type' => 'radio',
			'choices' => array(
				'folio-pagination-on' => 'Enabled',
				'folio-pagination-off' => 'Disabled'
			),
			'priority' => 6
		)
	);

	/* Grid items */

	$wp_customize->add_setting(
		'krown_folio_items', array(
			'default' => '24',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_folio_items', 
		array(
			'label' => 'Portfolio items / page',
			'section' => 'portfolio',
			'settings' => 'krown_folio_items',
			'type' => 'text',
			'priority' => 7
		)
	);

	/* Modal Project Background */

	$wp_customize->add_setting(
		'krown_folio_dummy_background', array(
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control(
	    new WP_Customize_Image_Control(
	        $wp_customize,
	        'krown_folio_dummy_background',
	        array(
	            'label' => 'Modal projects dummy background',
	            'section' => 'portfolio',
	            'settings' => 'krown_folio_dummy_background',
				'priority' => 8
	        )
	    )
	);

	/* Modal Project Close */

	$wp_customize->add_setting(
		'krown_folio_modal_close_click', array(
			'default' => 'false',
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_folio_modal_close_click', 
		array(
			'label' => 'Modal project close by click',
			'section' => 'portfolio',
			'settings' => 'krown_folio_modal_close_click',
			'type' => 'radio',
			'choices' => array(
				'true' => 'Enabled',
				'false' => 'Disabled'
			),
			'priority' => 9
		)
	);

	/* Sharing Buttons */

	$wp_customize->add_setting(
		'krown_folio_share', array(
			'default' => 'show',
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_folio_share', 
		array(
			'label' => 'Show sharing buttons',
			'section' => 'portfolio',
			'settings' => 'krown_folio_share',
			'type' => 'radio',
			'choices' => array(
				'show' => 'Enabled',
				'hide' => 'Disabled'
			),
			'priority' => 10
		)
	);

	/* --- GALLERY --- */
	////////////////////////

	/* Gallery page */

	$wp_customize->add_setting(
		'krown_gallery_page', array(
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_gallery_page', 
		array(
			'label' => 'Choose the gallery page',
			'section' => 'gallery',
			'settings' => 'krown_gallery_page',
			'type' => 'dropdown-pages',
			'priority' => 1
		)
	);

	/* Hover auto color */

	$wp_customize->add_setting(
		'krown_gal_hover_style', array(
			'default' => 'style-2',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gal_hover_style', 
		array(
			'label' => 'Thumbs hover',
			'section' => 'gallery',
			'settings' => 'krown_gal_hover_style',
			'type' => 'select',
			'choices' => array(
				'style-1' => 'Style #1',
				'style-2' => 'Style #2',
			),
			'priority' => 2
		)
	);

	/* Thumbs opacity */

	$wp_customize->add_setting(
		'krown_gal_thumbs_opacity', array(
			'default' => '.95',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gal_thumbs_opacity', 
		array(
			'label' => 'Thumbs opacity',
			'section' => 'gallery',
			'settings' => 'krown_gal_thumbs_opacity',
			'type' => 'text',
			'priority' => 3
		)
	);

	/* Thumbs ratio */

	$wp_customize->add_setting(
		'krown_gal_thumbs_ratio', array(
			'default' => 'ratio_4-3',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gal_thumbs_ratio', 
		array(
			'label' => 'Thumbs ratio',
			'section' => 'gallery',
			'settings' => 'krown_gal_thumbs_ratio',
			'type' => 'select',
			'choices' => array(
				'ratio_4-3' => '4:3',
				'ratio_16-9' => '16:9',
				'ratio_16-10' => '16:10',
				'ratio_1-1' => '1:1'
			),
			'priority' => 4
		)
	);

	/* Thumbs width */

	$wp_customize->add_setting(
		'krown_gal_thumbs_width', array(
			'default' => '340',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gal_thumbs_width', 
		array(
			'label' => 'Thumbs maximum width',
			'section' => 'gallery',
			'settings' => 'krown_gal_thumbs_width',
			'type' => 'text',
			'priority' => 5
		)
	);

	/* Pagination */

	$wp_customize->add_setting(
		'krown_gallery_pagination', array(
			'default' => 'folio-pagination-off',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gallery_pagination', 
		array(
			'label' => 'Gallery pagination',
			'section' => 'gallery',
			'settings' => 'krown_gallery_pagination',
			'type' => 'radio',
			'choices' => array(
				'folio-pagination-on' => 'Enabled',
				'folio-pagination-off' => 'Disabled'
			),
			'priority' => 6
		)
	);

	/* Grid items */

	$wp_customize->add_setting(
		'krown_gallery_items', array(
			'default' => '24',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gallery_items', 
		array(
			'label' => 'Gallery items / page',
			'section' => 'gallery',
			'settings' => 'krown_gallery_items',
			'type' => 'text',
			'priority' => 7
		)
	);

	/* Fill */

	$wp_customize->add_setting(
		'krown_gallery_fit', array(
			'default' => 'fill',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_gallery_fit', 
		array(
			'label' => 'Gallery image resizing',
			'section' => 'gallery',
			'settings' => 'krown_gallery_fit',
			'type' => 'radio',
			'choices' => array(
				'fill' => 'Fill',
				'fit' => 'Fit'
			),
			'priority' => 8
		)
	);
	
	/* Autoplay */

	$wp_customize->add_setting(
		'krown_gallery_autoplay', array(
			'default' => 'true',
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_gallery_autoplay', 
		array(
			'label' => 'Autoplay slideshow',
			'section' => 'gallery',
			'settings' => 'krown_gallery_autoplay',
			'type' => 'radio',
			'choices' => array(
				'true' => 'Enabled',
				'false' => 'Disabled'
			),
			'priority' => 9
		)
	);
	
	/* Speed */

	$wp_customize->add_setting(
		'krown_gal_speed', array(
			'default' => '5000',
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_gal_speed', 
		array(
			'label' => 'Slideshow speed',
			'section' => 'gallery',
			'settings' => 'krown_gal_speed',
			'type' => 'text',
			'priority' => 10
		)
	);

	/* Minimize */

	$wp_customize->add_setting(
		'krown_gallery_minimized', array(
			'default' => 'false',
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_gallery_minimized', 
		array(
			'label' => 'Minimized gallery details',
			'section' => 'gallery',
			'settings' => 'krown_gallery_minimized',
			'type' => 'radio',
			'choices' => array(
				'true' => 'Enabled',
				'false' => 'Disabled'
			),
			'priority' => 11
		)
	);


	/* Sharing Buttons */

	$wp_customize->add_setting(
		'krown_gallery_share', array(
			'default' => 'show',
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_gallery_share', 
		array(
			'label' => 'Show sharing buttons',
			'section' => 'gallery',
			'settings' => 'krown_gallery_share',
			'type' => 'radio',
			'choices' => array(
				'show' => 'Enabled',
				'hide' => 'Disabled'
			),
			'priority' => 12
		)
	);

	/* --- BLOG --- */
	////////////////////////

	/* Blog page */

	$wp_customize->add_setting(
		'krown_blog_page', array(
			'capability' => 'edit_theme_options',
			'type' => 'option'
		)
	);
	$wp_customize->add_control('krown_blog_page', 
		array(
			'label' => 'Choose the blog page',
			'section' => 'blog',
			'settings' => 'krown_blog_page',
			'type' => 'dropdown-pages'
		)
	);

	/* Blog style */

	$wp_customize->add_setting(
		'krown_blog_style', array(
			'default' => 'Default',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_blog_style', 
		array(
			'label' => 'Blog layout',
			'section' => 'blog',
			'settings' => 'krown_blog_style',
			'type' => 'radio',
			'choices' => array(
				'Default' => 'Default (two columns)',
				'Full' => 'Full width (one column)'
			)
		)
	);


	/* --- SWATCHES --- */
	////////////////////////

	/* Main Color */

	$colorsArray = array(
		array(
			'label' => 'Main Color',
			'default' => '#FF6833',
			'setting' => 'main1'
		),
		array(
			'label' => 'Sidebar Background Color',
			'default' => '#3A3A3A',
			'setting' => 'side1'
		),
		array(
			'label' => 'Sidebar Text Color',
			'default' => '#8D8D8D',
			'setting' => 'side2'
		),
		array(
			'label' => 'Sidebar Menu Hover Color',
			'default' => '#1F1F1F',
			'setting' => 'side3'
		),
		array(
			'label' => 'Sidebar Menu Selected Back Color',
			'default' => '#FF6833',
			'setting' => 'side4'
		),
		array(
			'label' => 'Sidebar Menu Selected Text Color',
			'default' => '#FFFFFF',
			'setting' => 'side5'
		)
	);

	$i = 10;

	foreach($colorsArray as $color){

		$wp_customize->add_setting(
			'krown_colors[' . $color['setting'] . ']', array(
				'default' => $color['default'],
				'type' => 'option',
				'capability' => 'edit_theme_options'
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				'krown_colors[' . $color['setting'] . ']', array(
					'label' => $color['label'],
					'section' => 'colors',
					'settings' => 'krown_colors[' . $color['setting'] . ']',
					'priority' => $i++
				)
			)
		);
	}

	/* --- TYPOGRAPHY --- */
	////////////////////////

	/* Headings Font */

	$wp_customize->add_setting(
		'krown_type_heading', array(
			'default' => 'Raleway',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_type_heading', 
		array(
			'label' => 'Headings Font',
			'section' => 'typography',
			'settings' => 'krown_type_heading',
			'type' => 'select',
			'choices' => $google_fonts_simple
		)
	);

	/* Body Font */

	$wp_customize->add_setting(
		'krown_type_body', array(
			'default' => 'Raleway',
			'type' => 'option',
			'capability' => 'edit_theme_options'
		)
	);
	$wp_customize->add_control('krown_type_body', 
		array(
			'label' => 'Body Font',
			'section' => 'typography',
			'settings' => 'krown_type_body',
			'type' => 'select',
			'choices' => $google_fonts_simple
		)
	);

}

add_action('customize_register', 'krown_customizer');

?>