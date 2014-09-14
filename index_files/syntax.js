var RESERVED = ['@interface', '@end',
   'if', 'while', 'for', 'then', 'else', 'do', 'repeat', 'until', 'with', 'and',
   'or', 'xor', 'is', 'in', 'out', 'div', 'mod', 'static', 'method', 'local', 'global',
   'yield', 'return', 'break', 'continue', 'where', 'change', 'map', 'filter', 'any', 'all', 'forget', 'not', 'var', 'extract', 'transparent', 'breakable', 'continuable', 'print', 'switch', 'case', 'void', 'NULL', 'default', 'inline', 'static', 'typedef', 'struct', 'bool', 'int', 'enum', 'union', 'unsigned', 'long', 'double', 'true', 'false', 'char', 'read', 'write', 'from', 'map', 'set'];

var CLASSES = ['UIImage', 'void', 'NSShadow', 'PCGradient', 'UIColor', 'NSObject', 'CGRect', 'MyStyleKit',
   'yes', 'no', 'self', 'nil', 'none', 'List', 'Number', 'String', 'Boolean', 'Function', 'Object', 'Bool', 'Int', 'Real', 'This', 'NativeFunction', 'Array', 'Nil', 'Sequence', 'Interval', 
'Class', 'Method', 'System', 'Range', 'Iterator', 'infinity', 'MetaClass', 'ArchClass', 'FiniteIterator', 'Pair', 'Dictionary', 'File', 'Canvas', 'Turtle', 'ObjectRef', 'ULONG', 'MachineRef', 'BYTE', 'char', 'charRef', 'WorkerRef', 'SourcePosition', 'StringRef', 'CompilerRef', 'FreePolicy', 'ScannerRef', 'ParserRef', 'GeneratorRef', 'NodeRef', 'TokenRef', 'LONG', 'DOUBLE', 'UIBezierPath', 'CGFloat'];
   
var CONSTRUCTS = [
   'var', 'method', 'function', 'slot', 'class', 'native', 'property'
];


function isIn(s, list)
{
	return list.contains(s);
}

function isUpperCaseLetter(c)
{
	return 'A' <= c && c <= 'Z';
}

function isLetter(c)
{
	return isUpperCaseLetter(c) || ('a' <= c && c <= 'z');
}
function isNumber(c)
{
	return '0' <= c && c <= '9';
}

var start = 0;
var finish = 0;
var lexem = "";
var from = 0;
var i = 0;
var result = "";

function endLexem(newLexem)
{	
	if (lexem == "identifier")
	{
        if (text.substring(from, i) == "assert") lexem = "macro"; else
        if (text.substring(from, i) == "#define") lexem = "macro"; else
		if (isIn(text.substring(from, i), CONSTRUCTS)) lexem = "construct"; else
		if (isIn(text.substring(from, i), RESERVED)) lexem = "reserved"; else
		if (isIn(text.substring(from, i), CLASSES)) lexem = "class"; else
		if (isUpperCaseLetter(text[from+1])) lexem = "macro"; else
		if (i<text.length && text[i] == "(") lexem = "call"; else
        if (text[from-1] == '>' && text[from-2] == '-') lexem = "construct";
	}

	if (lexem == "string")
		i++;

	selStart = from;
    selLength = i+1-from+1;

    result += "<span class='"+lexem+"'>" + text.substring(from, i).replace(" ", "&nbsp;").replace("\n", "") + "</span>";

//	if (lexem == "string" && text[i+1] == "\n")
//		result += "<br/>";
	
	from = i;
        if (lexem == "string")
                i--;
	lexem = newLexem;
	
}

function highlight(source)
{
	start = 0;
	finish = 0;
	lexem = "";
	from = 0;
	i = 0;


    result = "";
	text = source;
	finish = text.length;

	from = start;
	//result += "<p class='code'>";
	for (i=start; i<finish; i++)
	{
		if (isLetter(text[i]) || text[i] == "_" || text[i] == "@" || text[i] == "#")
		{
			if (lexem != "string" && lexem != "comment" && lexem != "identifier")
				endLexem("identifier");
		} else
		if (isNumber(text[i]))
		{
			if (lexem != "string" && lexem != "comment" && lexem != "identifier" && lexem != "number")
				endLexem("number");
		} else
		if (text[i] == "[" || text[i] == "]")
		{
			if (lexem != "string" && lexem != "comment")
				endLexem("square");
		} else
		if (text[i] == "(" || text[i] == ")")
		{
			if (lexem != "string" && lexem != "comment")
				endLexem("parenthesis");
		} else
		if (text[i] == ".")
		{
			if (lexem != "string" && lexem != "comment" && ((i > text.length) || !isNumber(text[i])))
				endLexem("space");
		} else
		if (text[i] == "'")
		{
			if (lexem != "comment")
				if (lexem != "string") 
					endLexem("string"); 
				else 
					endLexem("space");
		} else
		if (text[i] == "\"")
		{
			if (lexem != "comment")
				if (lexem != "string")
					endLexem("string"); 
				else 
					endLexem("space");
		} else
		if (text[i] == '/' && text[i+1] == '/')
		{
			if (lexem != "string")
					endLexem("comment");
		} else
		if (text[i] == "\n")
		{
			if (lexem != "comment" || text[i-1] != "\\")
			{
				text[i] = ' ';
				endLexem("space");
				if (i!=0) result += "<br/>";					
            }
		}
		else
		{
			if (lexem != "space" && lexem != "comment" && lexem != "string")
				endLexem("space");
		}
	}
	//result += "</p>";
	return result;
}

Array.prototype.contains = function(obj)
{
  var i = this.length;
  while (i--)
    if (this[i] === obj)
      return true;
  return false;
}

function getElementsByClass(className) 
{
	var classElements = [];
	var elements = document.getElementsByTagName('*');
	var count = elements.length;
	var pattern = new RegExp('(^|\\s)' + className + '(\\s|$)');

	for (i = 0, j = 0; i < count; i++) 
		if (pattern.test(elements[i].className)) 
			classElements[j++] = elements[i];

	return classElements;
}

function highlightAll()
{
    var elementsToHighlight = document.getElementsByTagName('pre');
    var count = elementsToHighlight.length;

    for (var i=0; i<count; i++)
    {
        elementsToHighlight[i].className += " code";
    	elementsToHighlight[i].innerHTML = highlight(elementsToHighlight[i].innerHTML.replace(/\t/g, '    ').replace(/(&nbsp;)/g, ' ').replace(/(&gt;)/g, '>').replace(/(&lt;)/g, '<').replace(/(&amp;)/g, '&'));
    }
}