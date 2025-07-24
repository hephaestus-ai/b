---
title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem"
date: 2021-07-05
tags: [ "go", "golang", "template", "themes", "development"]
draft: true
citation_style: apa
citations:
  watson1953:
    author: "Watson, James D. and Crick, Francis H. C."
    title: "A Structure for Deoxyribose Nucleic Acid"
    journal: "Nature"
    volume: "171"
    number: "737"
    pages: "737–738"
    year: "1953"
    # should turn into a hyperlink
    doi: "10.1038/171737a0"
    text: "Watson & Crick (1953)"
  hawking1988:
    author: "Hawking, Stephen"
    title: "A Brief History of Time"
    year: "1988"
    publisher: "Bantam"
    link: "https://example.com/hawking-book"
    text: "Hawking (1988)"
  turing1936:
    author: "Turing, Alan"
    title: "On Computable Numbers, with an Application to the Entscheidungsproblem"
    journal: "Proceedings of the London Mathematical Society"
    volume: "s2-42"
    number: "1"
    pages: "230–265"
    year: "1936"
    link: "https://example.com/turing1936"
    text: "Turing (1936)"

  incomplete2025:
    title: "A Mysterious Paper"
    year: "2025"
    # No author, no journal, no link — should fallback (TODO is this really the behavior I want?)
    text: "Anonymous (2025)"
  incomplete2024:
    title: "Another Mysterious Paper"
    year: "2024"
    # No author, no journal, no link — should fallback (TODO is this really the behavior I want?)
    text: "[Anonymous](https://en.wikipedia.org/wiki/Special:Random)"
---

## Hello

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dolor non neque posuere aliquam. Proin porttitor sem sem, ac viverra justo ultrices eget. Proin dui justo, semper porttitor erat a, semper tempor dolor. Vestibulum ultrices mauris ac dolor molestie faucibus. Vestibulum efficitur euismod nisl, vitae consequat orci porta vel. Suspendisse efficitur est mauris, sit amet pulvinar justo ullamcorper in. Praesent porttitor nisi quis rutrum maximus. Pellentesque sodales, quam eget semper rhoncus, velit risus sagittis arcu, ut gravida tortor dolor ut diam. Praesent nulla tellus, pellentesque ut finibus ut, eleifend et ex. Vivamus porta odio ac erat elementum dapibus. Curabitur lacinia sagittis eros, a maximus leo rutrum nec. Aenean faucibus ligula sit amet ligula laoreet, vel rutrum dui tempor. Cras vel pellentesque ante. Aliquam sed lobortis ex, vel iaculis ante. Sed et nisl ut massa porttitor efficitur pellentesque vel massa. Aliquam dapibus leo non ex porttitor malesuada.

{{< table_of_contents >}}

## Next Section

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in dolor ac diam porta varius. Nulla ut nisi ultricies, ullamcorper nisi a, pellentesque odio. Donec vitae cursus massa. Quisque hendrerit mi aliquet tristique aliquam. Fusce posuere dapibus posuere. Sed sagittis dolor et lorem condimentum rutrum. Maecenas diam felis, egestas et posuere ut, sagittis interdum sem. In ultricies ex sit amet lobortis cursus. Mauris pretium odio vel ex commodo, vel commodo tortor lacinia. Fusce euismod lacinia urna in tincidunt. Vestibulum id venenatis justo, ac suscipit eli

{{< hovercard text="[1]" maxW="300px" maxH="340px" key="turing1936" style="apa">}}
**OpenAI** began in 2015 and now focuses on  

- Generative models  
- Safety & alignment  
- Public research
- Generative models  
- Safety & alignment  
- Public research
- Generative models  
- Safety & alignment  
- Public research
- Generative models  
- Safety & alignment  
- Public research


[openai.com](https://openai.com)
{{< /hovercard >}}This sentence mentions OpenAI without ever
breaking the paragraph.

Nulla vel dolor suscipit, vestibulum odio nec, lobortis nulla. Cras libero arcu, faucibus eu tristique{{< hovercard text="[1]" maxW="400px" maxH="340px" >}}
**OpenAI** began in 2015 and now focuses on  

- Generative models  
- Safety & alignment  
- Public research  

[openai.com](https://openai.com)
{{< /hovercard >}} eget, venenatis non elit. Pellentesque pellentesque porta tristique. Proin lacinia vel elit ut tincidunt. Fusce quis metus nec justo tristique semper. Duis dapibus nulla velit, ut auctor turpis ultrices nec. In viverra faucibus varius. Cras quis nisi a nulla accumsan sollicitudin. Phasellus ac mauris vitae est fringilla ultrices vel non quam. Curabitur sodales, magna ut maximus fermentum, ligula arcu consequat est, at posuere arcu velit et lorem. Duis suscipit eros nulla, in venenatis velit volutpat at. In vitae sem neque. The experiment was replicated in multiple studies and the findings were consistent.


Fusce augue leo, rhoncus eu turpis sit amet, consequat tempus neque. Fusce non ante augue. Aenean at tellus sit amet odio aliquam sagittis. Sed sit amet luctus elit. Ut tristique varius finibus. Vivamus elementum pulvinar urna. Ut ornare nibh at dui vehicula cursus. Aliquam ac odio ipsum. Cras posuere efficitur magna, ac viverra tellus finibus ac. Sed eget sollicitudin ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section for LaTeX examples Section for LaTeX examples 

Inline math like $E = mc^2$ looks good.

Or a block equation:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

{{</* raw */>}}
$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n
$$
{{</* /raw */>}}

## Section for Code Block Examples

```bash {linenos=inline hl_lines=[3,"6-8"] style=vulcan}
## this is a comment
$ echo this is a command
this is a command

## edit the file
$vi foo.md
+++
date = "2014-09-28"
title = "creating a new theme"
+++

bah and humbug
:wq

## show it
$ cat foo.md
+++
date = "2014-09-28"
title = "creating a new theme"
+++

bah and humbug
$
```

Naked code block:

```
## this is a comment
$ echo this is a command
this is a command

## edit the file
$vi foo.md
+++
date = "2014-09-28"
title = "creating a new theme"
+++

bah and humbug
:wq

## show it
$ cat foo.md
+++
date = "2014-09-28"
title = "creating a new theme"
+++

bah and humbug
$
```

Normal paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dolor non neque posuere aliquam. Proin porttitor sem sem, ac viverra justo ultrices eget. Proin dui justo, semper porttitor erat a, semper tempor dolor. Vestibulum ultrices mauris ac dolor molestie faucibus. Vestibulum efficitur euismod nisl, vitae consequat orci porta vel. Suspendisse efficitur est mauris, sit amet pulvinar justo ullamcorper in.

> quote? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dolor non neque posuere aliquam. Proin porttitor sem sem, ac viverra justo ultrices eget. Proin dui justo, semper porttitor erat a, semper tempor dolor. Vestibulum ultrices mauris ac dolor molestie faucibus. Vestibulum efficitur euismod nisl, vitae consequat orci porta vel. Suspendisse efficitur est mauris, sit amet pulvinar justo ullamcorper in. Praesent porttitor nisi quis rutrum maximus. Pellentesque sodales, quam eget semper rhoncus, velit risus sagittis arcu, ut gravida tortor dolor ut diam. Praesent nulla tellus, pellentesque ut finibus ut, eleifend et ex. Vivamus porta odio ac erat elementum dapibus.
> - Mark Twain

Another normal paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dolor non neque posuere aliquam. 

>> double indent. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dolor non neque posuere aliquam. Proin porttitor sem sem, ac viverra justo ultrices eget. Proin dui justo, semper porttitor erat a, semper tempor dolor. Vestibulum ultrices mauris ac dolor molestie faucibus. Vestibulum efficitur euismod nisl, vitae consequat orci porta vel.
>> - ~ Mark Twain

>>> hello, this is a triple indent

## Section for Table Examples

| Statement                                                                              | Verdict              |
| -------------------------------------------------------------------------------------- | -------------------- |
| “∞-categories have no use in functional programming”                                   | ❌ Not entirely true  |
| “Most results from ∞-categories don't directly apply to existing functional languages” | ✅ Mostly true        |
| “There’s potential for ∞-categories in future language design and type theory”         | ✅ Yes, growing field |



| Feature          | n-Category                     | ∞-Category                              |
| ---------------- | ------------------------------ | --------------------------------------- |
| Morphism levels  | Up to finite $n$               | Infinite tower of morphisms             |
| Higher morphisms | Stop at level $n$              | Go on forever                           |
| Laws             | Strict or weak up to level $n$ | Weak at all levels (up to homotopy)     |
| Use case         | Finite categorical structures  | Homotopy theory, derived geometry, etc. |


## Next Section

Fusce placerat, magna eget egestas imperdiet, metus lectus iaculis nulla, eu aliquam urna ex at metus. Nunc hendrerit dignissim urna in bibendum. Phasellus auctor in est non facilisis. Pellentesque nisl nibh, viverra eu varius a, semper at tellus. Morbi erat mi, imperdiet in rutrum quis, fringilla et sem. Donec hendrerit dapibus feugiat. Donec aliquam cursus tellus. Ut dignissim lacus in ligula pellentesque, sed porttitor tortor lacinia. Nullam sit amet metus vitae nibh finibus sagittis ac egestas metus. Quisque posuere nisi tortor, eget finibus nibh condimentum vel. Pellentesque nec eros non ex ultrices cursus at in lectus. Nunc id nisi sapien.

Etiam lobortis, nisl et fermentum maximus, felis mauris aliquam enim, sed bibendum ipsum leo a magna. Aliquam eu mi dapibus, sollicitudin magna quis, feugiat nulla. In ut sem felis. Curabitur semper metus et lorem feugiat ultricies. Mauris sed purus vehicula, commodo tellus a, faucibus urna. Aenean ex odio, posuere ac lorem nec, auctor pellentesque augue. Aenean euismod, leo sed interdum bibendum, lectus quam finibus sapien, sed placerat urna magna et nunc. Curabitur tempor vulputate metus at facilisis. Nulla facilisi. Nulla id ultrices risus, ac ullamcorper quam. Vivamus lobortis lectus tellus, sit amet eleifend ligula placerat quis. Proin sed risus vel mi pellentesque bibendum nec ac ante. Nulla a mauris pretium, imperdiet quam ut, dictum urna.


Praesent ultricies tempus sapien sed posuere. Donec non tortor et lacus cursus vehicula eu sed tortor. Pellentesque eu neque id tellus pretium feugiat. Nam quis lacus urna. Donec rhoncus velit porta imperdiet volutpat. Nunc dolor arcu, feugiat sed congue blandit, sagittis rhoncus massa. Nam sed leo at lectus elementum condimentum a et odio. Suspendisse quam arcu, dignissim in finibus nec, luctus vitae sem.

{{< mediabox
     type="image"
     src="/images/1.png"
     title="Entropy Illustration - Box 1"
     caption="Entropy is a scientific concept, most commonly associated with states of disorder, randomness, or uncertainty. The term and the concept are used in diverse fields, from classical thermodynamics, where it was first recognized, to the microscopic description of nature in statistical physics, and to the principles of information theory. It has found far-ranging applications in chemistry and physics, in biological systems and their relation to life, in cosmology, economics, sociology, weather science, climate change and information systems including the transmission of information in telecommunication."
     citeOverride="[Wikipedia](https://en.wikipedia.org/wiki/Entropy)"
     align="right"
     width="45%"
	 layout="editorial"
	 greyBg="true"
	 fullscreen=true
	 marginBottom="2em"
>}}{{< /mediabox >}}

Cras id justo nec leo cursus commodo et vel erat. Vestibulum sit amet lacus risus. Donec efficitur, metus eu fermentum auctor, odio metus imperdiet est, vel vestibulum dolor ex in ante. Donec placerat dui ut commodo molestie. Nulla lectus arcu, lacinia semper velit sit amet, porta eleifend diam. Cras hendrerit gravida sem viverra feugiat. Aenean volutpat sollicitudin nibh, in viverra sem dapibus cursus. Sed pharetra neque sapien, id imperdiet turpis dignissim ut. In sollicitudin porttitor enim, id imperdiet lacus gravida in. Integer dignissim faucibus tincidunt. Quisque porta magna sit amet quam lobortis consectetur. Quisque luctus sollicitudin purus. Maecenas consequat metus eget ante iaculis, suscipit ultrices lacus fringilla. In ac nulla eu diam faucibus lacinia. Aliquam quis pellentesque velit. Pellentesque sed mauris mollis, interdum ipsum elementum, vehicula leo.



Vivamus ac lacus placerat, tempus nisl eget, pharetra est. Vivamus sit amet magna ut nunc dapibus eleifend. Pellentesque nisi lectus, semper vitae auctor et, volutpat nec metus. Donec luctus augue nec vehicula suscipit. Nunc in arcu finibus, egestas nunc sit amet, tristique neque. Morbi euismod laoreet orci, non ultrices purus volutpat in. Mauris tincidunt est sit amet ante sodales, sed scelerisque orci congue. Phasellus in ipsum ligula. Maecenas nec mattis mi. Nunc et erat vel nisl laoreet blandit blandit id mi.



## Another Section

Some intro text referencing [Box 1](#box-1).

{{< mediabox type="note" title="Box 2 – Definition" align="right" clear="true">}}
**Entropy** is a measure of disorder in a system.  
Mathematically, $S = k \ln \Omega$.
{{< /mediabox >}}

^^^ there will be a gap inconsistency due to the clear:both; div if you use margin instead of padding for reasons.

Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin neque metus, tincidunt ac risus eu, interdum finibus turpis. Mauris eleifend risus lectus, sed fermentum tortor tempor ac. Cras magna augue, sollicitudin sed malesuada a, egestas ut mauris. In magna metus, iaculis quis mi rutrum, lobortis finibus justo. Praesent dignissim tortor et elit fermentum consequat. Nullam eleifend sem quis sagittis iaculis. Nullam eget nisi ligula. Cras maximus nulla volutpat mollis ultricies. Pellentesque finibus tristique urna vitae tempus.

In mattis leo in euismod eleifend. Suspendisse sodales cursus neque. Sed rutrum mollis nisl. Mauris sodales semper rhoncus. Vestibulum tempor rhoncus tortor, et aliquam orci cursus in. Nam aliquet felis sit amet lacus venenatis, nec aliquet felis semper. Pellentesque convallis velit id dui posuere iaculis. Sed faucibus magna et nisl molestie, eu luctus ante auctor. Aliquam eu justo in quam pretium semper.

Sed ac euismod mauris. Aenean eleifend sodales turpis in dapibus. Aliquam erat volutpat. Suspendisse ut tempus justo. Sed consequat sem non nisl consequat tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur commodo risus sem. Morbi dictum, nunc eget pretium maximus, leo magna tincidunt magna, ut aliquam nisl ante non orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;




Etiam euismod sodales nunc in mattis. {{< hovercard text="DNA" citeKey="watson1953" citeText="Watson & Crick (1953)" citeLink="https://doi.org/10.1038/171737a0" >}}…{{< /hovercard >}} In sit amet urna consequat, fermentum magna at, vestibulum ligula. Mauris nec ex nec nunc pulvinar hendrerit vitae vitae leo. Donec semper lectus congue pharetra varius. Sed imperdiet sit amet sapien tincidunt tempor. Donec nisi risus, sodales vel rhoncus vel, interdum et ligula. Aliquam sodales felis at cursus molestie. Sed a semper ligula. Phasellus blandit lorem urna, vitae tristique eros pharetra sed. Praesent accumsan nisl est, {{< hovercard text="double-helix"  maxW="300px" key="watson1953" style="apa">}}…{{< /hovercard >}} non sagittis magna mattis et.

Sed suscipit et sapien vitae consequat. Sed lacinia placerat sapien, non tempus quam. Sed vitae mauris sagittis, cursus ex sit amet, tempus lectus. Proin id iaculis lorem. In a tellus sed dolor mollis aliquet vitae ut lacus. Nunc et tortor quis neque venenatis cursus placerat id est. Proin vel placerat velit, nec imperdiet ex. Proin ac pharetra dolor. Maecenas pellentesque feugiat porttitor. Sed vel dignissim felis, at ornare ipsum. Duis mi purus, malesuada non aliquam nec, porttitor at erat. Nam ultrices efficitur pharetra.

Fusce non lorem accumsan leo posuere gravida. Proin tempus ac est at placerat. Aliquam nunc quam, placerat ut nibh id, efficitur auctor eros. Nulla molestie ut lacus at tincidunt. Nunc semper odio ligula, non lobortis arcu porttitor at. In hac habitasse platea dictumst. Nullam nulla arcu, iaculis ac ornare ac, convallis quis nunc. Curabitur porttitor finibus purus eget efficitur. Nam auctor sed magna non mattis.

Donec non ultrices nibh, a mollis enim. Etiam eu mauris eros. Suspendisse eu dignissim nibh, in elementum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur in diam a mauris bibendum ultrices nec vitae arcu. Donec vestibulum dolor risus, vitae aliquam sapien lacinia non. Donec sit amet lacus at ante cursus fringilla eu quis nisi. In convallis ligula magna, sed pharetra arcu egestas quis. Nam magna elit, molestie ac nunc ac, interdum interdum lectus. Phasellus luctus ipsum quam, scelerisque tempor tellus condimentum sit amet. Fusce eget facilisis lorem, vitae dapibus magna. Duis blandit venenatis quam vel porta. In hac habitasse platea dictumst. Maecenas tempus ipsum nulla, quis imperdiet dolor vulputate ac. Phasellus ante risus, venenatis sit amet dapibus quis, dapibus id metus.

## Third Section

Proin finibus, ex nec vestibulum tincidunt, risus risus pharetra diam, nec egestas dui nulla rutrum eros. Integer egestas massa ut dui efficitur cursus. Aliquam tincidunt enim neque, eu consectetur sapien viverra vel. Nullam purus justo, tincidunt id dolor sed, auctor blandit dui. Donec nec justo enim. Donec lobortis mollis justo in rhoncus. Nulla facilisi. Duis tincidunt vitae erat sollicitudin aliquet. Proin fringilla, ligula eget tempus pellentesque, mi sem viverra arcu, vel sollicitudin ipsum augue a risus. Cras rutrum, mi nec egestas egestas, metus mauris dictum eros, sit amet dapibus augue odio ac erat. Phasellus eget diam ultricies, rutrum nisl eu, molestie nisl.

{{< chartbox
      data="test/gdp/world"
      type="bar"
      title="World GDP"
      caption="Source: World Bank"
      align="right"
      width="45%"
	  greyBg="true"
	  clear="true"
>}}


Nullam non nunc vitae erat dictum lacinia. Vivamus efficitur porttitor mi dictum mattis. Curabitur eu neque eros. Suspendisse iaculis lorem maximus efficitur dapibus. Nullam imperdiet vel nisl nec placerat. Proin mauris urna, ullamcorper vitae est et, sollicitudin consectetur nisl. Cras in maximus augue. Nullam nisi felis, hendrerit at hendrerit id, blandit in ante. Ut massa libero, maximus vel ipsum ut, malesuada eleifend neque. Vestibulum tristique dolor lacus, quis varius metus laoreet eget. Donec risus nisi, feugiat ut leo dictum, facilisis suscipit odio. Morbi lacus diam, molestie et volutpat in, consequat vitae libero. Nunc gravida sit amet tortor viverra euismod. Vestibulum rhoncus ornare neque id aliquet.

Nulla rhoncus, elit quis scelerisque pulvinar, arcu ligula maximus massa, et lobortis nulla diam eget orci. Maecenas a tellus lectus. Nulla imperdiet, neque eget malesuada porta, nisi erat interdum dolor, at commodo elit arcu in velit. Phasellus accumsan odio ac ultricies consequat. Fusce quis risus id ligula tincidunt faucibus. Curabitur nec sem id dolor finibus feugiat. Duis a diam mauris. Mauris in tortor commodo, consectetur orci at, commodo libero. Ut hendrerit ex nec auctor euismod. Vestibulum convallis volutpat massa, nec ultrices lorem luctus eget. In hac habitasse platea dictumst. Integer massa metus, efficitur in ex eu, consequat mattis nisi.

{{< mermaidbox
      title="User Login Flow"
      caption="Simplified sequence diagram"
      align="left"
      width="26%"
>}}
sequenceDiagram
  participant U as User
  participant S as Server
  U->>S: GET /login
  S-->>U: 200 OK
{{< /mermaidbox >}}

Sed faucibus vel urna sed dapibus. Vestibulum congue metus ornare, sagittis massa vel, ultricies nisi. Morbi in iaculis odio. Curabitur in vestibulum dui, eget laoreet magna. Vivamus eu lacus leo. Vivamus eget elit hendrerit, eleifend eros id, convallis nibh. Aenean dictum eget velit a vulputate. Quisque tincidunt augue in lorem aliquam interdum. Morbi eros dui, sollicitudin quis neque cursus, bibendum viverra nulla. Nullam in tristique tellus. Nunc a felis sed mauris vulputate tincidunt. Maecenas vel maximus ex. Morbi aliquam feugiat justo, a auctor lectus sodales ultrices. Nunc sollicitudin neque sit amet ullamcorper iaculis. Suspendisse faucibus leo tempor, auctor dolor sit amet, fermentum magna. Ut ultrices ligula ligula, vel facilisis orci eleifend ac.

{{< graphbox
      title="Simple flow"
      align="right"
      width="60%"
>}}
digraph {
  rankdir=LR;
  A [shape=rect label="Start"];
  B [shape=rect label="Process"];
  C [shape=rect label="End"];
  A -> B -> C;
}
{{< /graphbox >}}

Pellentesque est ante, lobortis eu lacinia sit amet, consequat in metus. Maecenas in turpis augue. Duis neque velit, cursus eu odio id, finibus rutrum erat. Suspendisse volutpat ullamcorper porttitor. Etiam feugiat ultricies libero, sit amet semper ante mattis a. Integer mollis ante odio, quis aliquam justo semper bibendum. Maecenas in lorem sodales, mollis mauris sit amet, gravida leo. Nunc a tortor vitae arcu accumsan rutrum a eget elit. Praesent dignissim eget nibh eget mollis. Curabitur blandit laoreet placerat.

Aliquam eu tellus varius justo pharetra consectetur non id sem. In sed erat sapien. Vivamus pellentesque orci nec porttitor pretium. Vestibulum id est sed purus dignissim varius eu nec mauris. Donec pellentesque, massa id volutpat blandit, elit eros fringilla dolor, ac egestas quam nisi eget felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus justo nibh, vehicula maximus est eget, consectetur fermentum turpis. In hac habitasse platea dictumst. Integer placerat elit id sagittis imperdiet. Etiam tristique faucibus nibh, eu fermentum felis imperdiet ultricies. Mauris felis mauris, scelerisque id dignissim eu, pretium sit amet ex.

## Last Section

Phasellus nec magna porttitor, dictum arcu ac, euismod nunc. Etiam molestie vehicula pulvinar. Pellentesque blandit quam odio, in luctus diam tristique non. Mauris massa arcu, placerat in purus eget, volutpat efficitur nisl. Cras et pretium tortor. Proin elementum, eros non ultricies tincidunt, mauris felis fermentum mi, non cursus justo leo eget magna. Etiam consequat, ipsum eu lacinia molestie, augue risus consequat lacus, ornare tincidunt velit elit eu nibh. Sed iaculis metus id sapien tempus feugiat. Sed non sodales libero. Praesent auctor justo id est dapibus pharetra. Proin sit amet ipsum ut justo ullamcorper eleifend. Mauris efficitur tortor risus, sed ullamcorper urna rhoncus ac. Integer nibh enim, molestie eu bibendum a, tincidunt ut urna. Aenean erat lectus, scelerisque a enim eget, vehicula suscipit dui.

Donec ut auctor purus. Sed tincidunt volutpat dolor. Etiam mi mauris, vehicula vel porta semper, venenatis eu sapien. Integer ut augue at nibh finibus rutrum. Donec ac semper tellus. Duis et nisl at ipsum volutpat ultricies at eleifend sem. In hac habitasse platea dictumst. Sed accumsan erat sit amet ultrices vestibulum. Mauris sollicitudin nisi quis lectus ornare ultricies. Suspendisse potenti. Praesent dapibus dui nec dui gravida tincidunt. Nam tristique ex non tellus sagittis fringilla. Proin tortor mi, blandit ut risus non, blandit sagittis arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Curabitur fringilla arcu id convallis convallis. Nullam semper leo id erat gravida rhoncus. Morbi in metus lacinia risus congue tristique. Maecenas volutpat a metus non mattis. Nulla facilisi. Donec lorem leo, vehicula a luctus eu, dictum nec odio. Donec lobortis facilisis ipsum, sed convallis purus aliquam ut.

{{< echartbox
     func3d="Math.sin(Math.hypot(x,y)) / Math.hypot(x,y)"
     xrange="-10,10"
     yrange="-10,10"
     step="0.5"
     height="500px"
     title="Interactive sinc (r) surface"
     width="70%"
     align="center"
	 caption="this is a caption"
	 
>}}{{< /echartbox >}}

Nulla posuere, urna id feugiat mollis, elit eros finibus sem, rhoncus accumsan sem diam at libero. Proin nec libero ac orci rhoncus bibendum. Sed eu urna consectetur massa mattis faucibus nec eget lorem. Mauris id lobortis mauris, vel cursus neque. Morbi a erat ut risus feugiat commodo. In imperdiet ligula a velit imperdiet posuere. Morbi tellus ligula, sagittis et sapien id, imperdiet convallis lacus. Duis risus mauris, feugiat sit amet tellus quis, vestibulum ultricies elit. Aenean malesuada, quam vel ullamcorper vehicula, enim dolor fermentum arcu, quis pellentesque ligula orci sed ex. Vivamus dapibus, mauris vitae consequat pellentesque, libero quam iaculis erat, quis molestie purus turpis eleifend mi. Aenean venenatis semper elit, nec varius libero gravida at. Quisque suscipit laoreet sapien, et vulputate mauris ultricies vitae. Curabitur aliquam magna in ex hendrerit aliquam. Etiam non consectetur felis.




Donec et feugiat purus. Donec aliquet accumsan rutrum. Vivamus quis lorem velit. Praesent egestas sed ante vel pulvinar. Duis eros augue, viverra non neque vel, cursus mollis sem. Nunc aliquam leo nec molestie posuere. Sed at mi id turpis sodales euismod. In varius urna ipsum, et faucibus purus eleifend vel. Nullam id dignissim urna. Donec mi quam, molestie et diam iaculis, scelerisque pretium turpis. Cras non consectetur nunc. Nunc sit amet venenatis est. Quisque ac dictum arcu, ac cursus enim. Fusce viverra mi id dolor sagittis, ac facilisis nunc dictum. Mauris ultrices lectus ac vehicula viverra.

{{< echartbox func2d="Math.sin(x)" width="30%" align="right">}}
function initChart(el, chart) {
  chart.setOption({
    title: { text: "Now animated!" },
    animationDuration: 2000
  });
}
{{< /echartbox >}}

{{< echartbox title="Live Clock Chart" width="30%" cite="turing1936" citeStyle="apa">}}
function initChart(el, chart) {
  const option = {
    series: [{
      type: 'gauge',
      progress: { show: true },
      axisLine: { lineStyle: { width: 15 } },
      data: [{ value: new Date().getSeconds() * 100 / 60 }]
    }]
  };

  chart.setOption(option);
  setInterval(() => {
    chart.setOption({ series: [{ data: [{ value: new Date().getSeconds() * 100 / 60 }] }] });
  }, 1000);
}
{{< /echartbox >}}

{{< echartbox title="Airplane Seats" width="30%" citeOverride="[example from here](https://echarts.apache.org/examples/en/editor.html?c=geo-seatmap-flight)">}}
function initChart(el, myChart) {
$.get('/test/assets/geo/flight-seats.svg', function (svg) {
  echarts.registerMap('flight-seats', { svg: svg });
  const takenSeatNames = ['26E', '26D', '26C', '25D', '23C', '21A', '20F'];
  option = {
    tooltip: {},
    geo: {
      map: 'flight-seats',
      roam: true,
      selectedMode: 'multiple',
      layoutCenter: ['50%', '50%'],
      layoutSize: '95%',
      tooltip: {
        show: true
      },
      itemStyle: {
        color: '#fff'
      },
      emphasis: {
        itemStyle: {
          color: undefined,
          borderColor: 'green',
          borderWidth: 2
        },
        label: {
          show: false
        }
      },
      select: {
        itemStyle: {
          color: 'green'
        },
        label: {
          show: false,
          textBorderColor: '#fff',
          textBorderWidth: 2
        }
      },
      regions: makeTakenRegions(takenSeatNames)
    }
  };
  function makeTakenRegions(takenSeatNames) {
    var regions = [];
    for (var i = 0; i < takenSeatNames.length; i++) {
      regions.push({
        name: takenSeatNames[i],
        silent: true,
        itemStyle: {
          color: '#bf0e08'
        },
        emphasis: {
          itemStyle: {
            borderColor: '#aaa',
            borderWidth: 1
          }
        },
        select: {
          itemStyle: {
            color: '#bf0e08'
          }
        }
      });
    }
    return regions;
  }
  myChart.setOption(option);
  // Get selected seats.
  myChart.on('geoselectchanged', function (params) {
    const selectedNames = params.allSelected[0].name.slice();
    // Remove taken seats.
    for (var i = selectedNames.length - 1; i >= 0; i--) {
      if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
        selectedNames.splice(i, 1);
      }
    }
    console.log('selected', selectedNames);
  });
});
}
{{< /echartbox >}}


## Conclusion

Ut at neque sapien. Pellentesque pharetra mollis fermentum. Mauris interdum neque id nunc cursus, vitae vehicula diam lacinia. Praesent porta semper velit eu faucibus. Mauris aliquet at lorem sit amet vehicula. Etiam congue finibus sapien in vulputate. Phasellus id lacus dui.

{{< separator text="~" size="1.5em" opacity="0.5" margin="0.5em 0" >}}

Ut ornare non lorem eget lacinia. Sed vitae ligula eu leo volutpat pellentesque quis vitae ligula. Maecenas finibus diam vel semper suscipit. Suspendisse at dui congue, sollicitudin ipsum at, pharetra augue. Integer eget cursus velit, at fringilla nisi. Praesent non pharetra est. In sed pulvinar augue, vitae blandit massa. Praesent molestie vehicula dignissim. Aliquam congue nibh maximus mollis sollicitudin. Sed nec velit vitae risus facilisis porta et eu diam. Suspendisse potenti. Vestibulum mattis nec purus non consectetur. Aenean non lacus non sapien fringilla convallis.

{{< separator text="§" size="2em" opacity="0.9" >}}

Cras laoreet arcu scelerisque augue volutpat euismod. Nunc commodo imperdiet magna sit amet mollis. Quisque id tincidunt leo. Phasellus eu quam erat. Vivamus volutpat ex quam, a posuere tortor pharetra quis. Suspendisse id tempus lectus. Donec at porttitor tellus. Suspendisse sit amet euismod enim, non volutpat leo. Morbi pulvinar iaculis dignissim. Curabitur sollicitudin congue neque, sit amet sollicitudin nisi. 

{{< separator text="" >}}

That is all.

## Bibliography

{{< refslist >}}
